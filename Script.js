
    /* ── MATRIX RAIN ── */
    (function(){
      const c=document.getElementById('matrix');
      const x=c.getContext('2d');
      function rs(){c.width=window.innerWidth;c.height=window.innerHeight}
      rs();window.addEventListener('resize',rs);
      const chars='アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>{}[]();'.split('');
      const cols=Math.floor(window.innerWidth/16);
      const drops=Array(cols).fill(1);
      setInterval(()=>{
        x.fillStyle='rgba(1,2,8,0.05)';x.fillRect(0,0,c.width,c.height);
        x.fillStyle='#00fff7';x.font='14px monospace';
        drops.forEach((y,i)=>{
          x.fillText(chars[Math.floor(Math.random()*chars.length)],i*16,y*16);
          if(y*16>c.height&&Math.random()>.975)drops[i]=0;
          drops[i]++;
        });
      },60);
    })();

    /* ── PARTICLE NET ── */
    (function(){
      const c=document.getElementById('pts');
      const x=c.getContext('2d');
      let W,H;
      const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight};
      resize();window.addEventListener('resize',resize);
      const COLS=['#00fff7','#ff00aa','#ffe600','#7c3aed','#00ff88'];
      const pts=Array.from({length:100},()=>({
        x:Math.random()*1600,y:Math.random()*1200,
        vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,
        r:Math.random()*1.8+.3,
        c:COLS[Math.floor(Math.random()*COLS.length)],a:Math.random()*.4+.1
      }));
      let mx=null,my=null;
      window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
      (function draw(){
        x.clearRect(0,0,W,H);
        const sx=W/1600,sy=H/1200;
        pts.forEach(p=>{
          if(mx!==null){
            const dx=p.x*sx-mx,dy=p.y*sy-my,dist=Math.hypot(dx,dy);
            if(dist<150){p.vx+=dx/dist*.05;p.vy+=dy/dist*.05}
          }
          p.vx*=.99;p.vy*=.99;
          p.x+=p.vx;p.y+=p.vy;
          if(p.x<0||p.x>1600)p.vx*=-1;
          if(p.y<0||p.y>1200)p.vy*=-1;
          x.beginPath();x.arc(p.x*sx,p.y*sy,p.r,0,Math.PI*2);
          x.fillStyle=p.c;x.globalAlpha=p.a;x.fill();
        });
        pts.forEach((a,i)=>{
          for(let j=i+1;j<pts.length;j++){
            const b=pts[j];
            const d=Math.hypot((a.x-b.x)*sx,(a.y-b.y)*sy);
            if(d<120){
              x.beginPath();x.moveTo(a.x*sx,a.y*sy);x.lineTo(b.x*sx,b.y*sy);
              x.strokeStyle='#00fff7';x.globalAlpha=(1-d/120)*.12;x.lineWidth=.5;x.stroke();
            }
          }
        });
        x.globalAlpha=1;requestAnimationFrame(draw);
      })();
    })();

    /* ── TYPEWRITER ── */
    (function(){
      const phrases=['DATA_ANALYST.py','WEB_DEVELOPER.js','PYTHON_ENGINEER.exe','MCA_STUDENT.edu','ML_ENTHUSIAST.ai','PROBLEM_SOLVER.cpp'];
      let pi=0,ci=0,del=false;
      function tick(){
        const ph=phrases[pi],el=document.getElementById('tw');
        if(!el)return;
        if(!del){el.textContent=ph.slice(0,++ci);if(ci===ph.length){del=true;setTimeout(tick,2000);return}}
        else{el.textContent=ph.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length;setTimeout(tick,400);return}}
        setTimeout(tick,del?35:75);
      }
      tick();
    })();

    /* ── SCROLL REVEAL ── */
    const obs=new IntersectionObserver(entries=>{
      entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('vis'),i*70);obs.unobserve(e.target)}});
    },{threshold:.08});
    document.querySelectorAll('.reveal,.revL,.revR,.revZ').forEach(el=>obs.observe(el));

    /* ── SKILL BARS ── */
    const barObs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.querySelectorAll('.bar-fill').forEach((b,i)=>setTimeout(()=>{b.style.width=getComputedStyle(b).getPropertyValue('--w')},i*180+300));
          barObs.unobserve(e.target);
        }
      });
    },{threshold:.3});
    const sb=document.getElementById('skillbars');
    if(sb)barObs.observe(sb);

    /* ── COUNT UP STATS ── */
    const countObs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.querySelectorAll('[data-target]').forEach(el=>{
            const target=+el.dataset.target,dur=1500,step=16;
            let cur=0;
            const t=setInterval(()=>{
              cur=Math.min(cur+Math.ceil(target/(dur/step)),target);
              el.textContent=cur+(target>5?'':'+');
              if(cur>=target)clearInterval(t);
            },step);
          });
          countObs.unobserve(e.target);
        }
      });
    },{threshold:.3});
    document.querySelectorAll('.stats-strip').forEach(el=>countObs.observe(el));

    /* ── 3D TILT CARDS ── */
    document.querySelectorAll('.sk-card,.proj-card,.stat-box').forEach(card=>{
      card.addEventListener('mousemove',e=>{
        const r=card.getBoundingClientRect();
        const rx=((e.clientY-r.top)/r.height-.5)*14;
        const ry=((e.clientX-r.left)/r.width-.5)*-14;
        card.style.transform=`perspective(600px) translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
        card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
      });
      card.addEventListener('mouseleave',()=>{card.style.transform='';});
    });
   