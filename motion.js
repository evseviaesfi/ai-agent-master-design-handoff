(() => {
  'use strict';
  const tablet = document.getElementById('tablet');
  const large = document.getElementById('large-tablet');
  const phase = document.getElementById('phase-status');
  const detailStatus = document.getElementById('detail-status');
  const dialog = document.getElementById('detail');
  const scene = document.querySelector('.scene');
  const art = document.querySelector('.scene-art');
  const copy = document.querySelector('.hero-copy');
  const device = document.querySelector('.device-space');
  const hand = document.querySelector('.hand-occlusion');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 700px)');
  const DURATION = 11.6;
  const labels = ['Your request', 'The request moves towards Master', 'Master activates and delegates work', 'Agents are working', 'Results return through Master', 'Done — task complete'];
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => {const x = clamp(value); return x*x*(3-2*x);};
  const mix = (a, b, t) => a + (b-a)*t;
  let animation = 0, started = 0, current = 0, lastPhase = -1, revealed = null;

  // Calibrated to the current photo. Update when the photographic asset changes.
  const calibration = {
    width:1591, height:989,
    screen:[[440,585],[592,608],[519,782],[364,755]],
    hand:[[552,701],[560,701],[566,709],[574,717],[583,733],[590,760],[586,791],[562,827],[533,845],[491,834],[476,814],[493,818],[504,797],[504,780],[511,764],[520,751],[528,740],[538,724],[544,713],[548,705]]
  };
  function homography(w,h,p) {
    const s=[[0,0],[w,0],[w,h],[0,h]], a=[];
    for(let i=0;i<4;i++){const [x,y]=s[i], [u,v]=p[i];a.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);}
    for(let c=0;c<8;c++){
      let k=c;for(let r=c+1;r<8;r++)if(Math.abs(a[r][c])>Math.abs(a[k][c]))k=r;
      [a[c],a[k]]=[a[k],a[c]];const d=a[c][c];for(let j=c;j<9;j++)a[c][j]/=d;
      for(let r=0;r<8;r++)if(r!==c){const q=a[r][c];for(let j=c;j<9;j++)a[r][j]-=q*a[c][j];}
    }
    const z=a.map(r=>r[8]);
    return `matrix3d(${[z[0],z[3],0,z[6],z[1],z[4],0,z[7],0,0,1,0,z[2],z[5],0,1].join(',')})`;
  }
  function place(){
    tablet.style.transform=homography(240,300,calibration.screen);
    device.style.width=calibration.width+'px';device.style.height=calibration.height+'px';
    const bounds=scene.getBoundingClientRect();
    const scale=Math.max(bounds.width/calibration.width,bounds.height/calibration.height);
    let x=0;
    if(narrow.matches)x=Math.min(0,Math.max(bounds.width-calibration.width*scale,bounds.width*.93-calibration.screen[1][0]*scale));
    else x=Math.min(0,Math.max(bounds.width-calibration.width*scale,bounds.width*.49-calibration.screen[1][0]*scale));
    const y=(bounds.height-calibration.height*scale)/2;
    art.style.width=calibration.width+'px';art.style.height=calibration.height+'px';
    art.style.transform=`translate(${x}px,${y}px) scale(${scale})`;
    hand.style.clipPath='polygon('+calibration.hand.map(([x,y])=>`${x/calibration.width*100}% ${y/calibration.height*100}%`).join(',')+')';
  }
  new ResizeObserver(place).observe(scene);place();

  function box(ctx,x,y,w,h,r,fill,stroke,lineWidth=1.5){
    ctx.beginPath();ctx.roundRect(x,y,w,h,r);
    if(fill){ctx.fillStyle=fill;ctx.fill();}
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.stroke();}
  }
  function route(ctx,points,color,width=2,opacity=1){
    ctx.save();ctx.globalAlpha=opacity;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin='round';
    ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.restore();
  }
  function pointOnRoute(points,fraction){
    const lengths=[];let total=0;
    for(let i=1;i<points.length;i++){const length=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);lengths.push(length);total+=length;}
    let distance=clamp(fraction)*total;
    for(let i=0;i<lengths.length;i++){
      if(distance<=lengths[i])return [mix(points[i][0],points[i+1][0],distance/lengths[i]),mix(points[i][1],points[i+1][1],distance/lengths[i])];
      distance-=lengths[i];
    }
    return points[points.length-1];
  }
  function packet(ctx,points,progress){
    if(progress<0||progress>1)return;
    const [x,y]=pointOnRoute(points,ease(progress));
    ctx.save();ctx.shadowColor='#5bed7a';ctx.shadowBlur=8;
    box(ctx,x-4.5,y-4.5,9,9,3,'#d9ffe2');ctx.restore();
  }
  function glass(ctx,t){
    // Low-contrast optical reflection, clipped to the physical display.
    ctx.save();ctx.beginPath();ctx.roundRect(0,0,240,300,8);ctx.clip();
    const veil=ctx.createLinearGradient(0,0,240,300);
    veil.addColorStop(0,'rgba(235,247,255,.075)');veil.addColorStop(.45,'rgba(255,255,255,0)');veil.addColorStop(1,'rgba(0,0,0,.14)');
    ctx.fillStyle=veil;ctx.fillRect(0,0,240,300);
    // One slow, broad window glint; it settles instead of looping.
    const shift=mix(-190,350,ease((t-3.8)/6.5));
    const shine=ctx.createLinearGradient(shift,0,shift+120,0);
    shine.addColorStop(0,'rgba(231,245,255,0)');shine.addColorStop(.44,'rgba(231,245,255,.015)');shine.addColorStop(.5,'rgba(241,249,255,.12)');shine.addColorStop(.62,'rgba(231,245,255,.035)');shine.addColorStop(1,'rgba(231,245,255,0)');
    ctx.translate(0,-40);ctx.transform(1,0,-.28,1,0,0);ctx.fillStyle=shine;ctx.fillRect(shift,0,120,430);ctx.restore();
    box(ctx,.6,.6,238.8,298.8,8,null,'rgba(224,238,246,.14)',1.2);
  }
  function draw(canvas,t){
    const ctx=canvas.getContext('2d');ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,240,300);
    ctx.fillStyle='#060e0a';ctx.fillRect(0,0,240,300);
    const appear=ease((t-.3)/.55),rise=ease((t-2)/1),taskY=mix(116,22,rise);
    const masterAppear=ease((t-3)/.55),active=ease((t-3.5)/.45),agentsAppear=ease((t-4.25)/.65);
    const masterPulse=t>=3.5&&t<4.3?Math.sin(clamp((t-3.5)/.8)*Math.PI):0;
    const final=ease((t-10)/.45);

    // First beat: only a single, smaller human request on the dark display.
    ctx.save();ctx.globalAlpha=appear;
    box(ctx,31,taskY,178,66,9,final>.5?'#d9f4df':'#e9f0eb',final>.5?'#6cf08a':null,2);
    ctx.textAlign='center';ctx.fillStyle='#10271b';
    if(final<1){ctx.save();ctx.globalAlpha=appear*(1-final);ctx.font='600 20px Montserrat,Arial';ctx.fillText('I need a',120,taskY+27);ctx.font='700 25px Montserrat,Arial';ctx.fillText('plan.',120,taskY+52);ctx.restore();}
    if(final>0){ctx.save();ctx.globalAlpha=final;ctx.font='750 31px Montserrat,Arial';ctx.fillText('Done',120,taskY+44);ctx.restore();}
    ctx.restore();

    if(masterAppear>0){
      ctx.save();ctx.globalAlpha=masterAppear;
      const toMaster=[[120,89],[120,132]],toTask=[...toMaster].reverse();
      route(ctx,toMaster,active>.5?'#3ddc5a':'#42664d',2.5,masterAppear);
      if(t>=3.4&&t<4.1)packet(ctx,toMaster,(t-3.4)/.7);
      if(t>=9.1&&t<10)packet(ctx,toTask,(t-9.1)/.9);
      ctx.save();ctx.shadowColor='#3ddc5a';ctx.shadowBlur=masterPulse*16;
      box(ctx,36,133,168,49,7,active>.5?'#215833':'#122b1d',active>.5?'#90f4a5':'#557a61',2.2);ctx.restore();
      ctx.fillStyle='#effff2';ctx.textAlign='center';ctx.font='700 24px Montserrat,Arial';ctx.fillText('MASTER',120,165);
      ctx.restore();
    }

    if(agentsAppear>0){
      ctx.save();ctx.globalAlpha=agentsAppear;
      for(let i=0;i<3;i++){
        const x=14+i*73,cx=x+33;
        const path=[[120,183],[120,207],[cx,207],[cx,229]];
        const assigned=ease((t-4.5-i*.2)/.85),done=ease((t-5.5-i*.42)/1.3);
        const hot=assigned>.5&&done<.98;
        route(ctx,path,assigned>.5?'#65e784':'#345a41',3,assigned>.5?.95:.6);
        if(t>=4.5+i*.2&&t<5.35+i*.2)packet(ctx,path,(t-4.5-i*.2)/.85);
        if(t>=7.5+i*.2&&t<8.45+i*.2)packet(ctx,[...path].reverse(),(t-7.5-i*.2)/.95);
        box(ctx,x,230,66,56,6,hot?'#2fbd50':done>.98?'#1d4d2c':'#112b1b',assigned>.5?'#92f4a8':'#476b54',2);
        ctx.textAlign='center';ctx.fillStyle=hot?'#031309':'#e1f9e7';ctx.font='600 11px Montserrat,Arial';ctx.fillText('AGENT',cx,247);
        ctx.font='750 21px Montserrat,Arial';ctx.fillText(String(i+1).padStart(2,'0'),cx,270);
        box(ctx,x+7,278,52,4,2,hot?'#13512a':'#264c34');if(done>0)box(ctx,x+7,278,52*done,4,2,hot?'#edfff1':'#95f0ac');
      }
      ctx.restore();
    }
    glass(ctx,t);
  }
  function phaseAt(t){return t<2?0:t<3.5?1:t<5.8?2:t<7.5?3:t<10?4:5;}
  function render(t){
    current=t;draw(tablet,t);draw(large,t);const index=phaseAt(t);
    const showCopy=t>=10.45;
    if(showCopy!==revealed){
      revealed=showCopy;document.documentElement.classList.toggle('intro-done',showCopy);
      copy.inert=!showCopy;copy.setAttribute('aria-hidden',String(!showCopy));
    }
    if(index!==lastPhase){phase.textContent=labels[index];detailStatus.textContent=labels[index];lastPhase=index;}
    document.documentElement.dataset.motionPhase=String(index);document.documentElement.dataset.motionTime=t.toFixed(2);
  }
  function tick(now){const t=Math.min((now-started)/1000,DURATION);render(t);if(t<DURATION)animation=requestAnimationFrame(tick);else animation=0;}
  function play(){cancelAnimationFrame(animation);document.documentElement.classList.remove('fixed-frame');if(reduce.matches){render(DURATION);return;}started=performance.now();render(0);animation=requestAnimationFrame(tick);}
  function still(){cancelAnimationFrame(animation);animation=0;render(DURATION);}
  document.getElementById('replay').addEventListener('click',play);
  document.getElementById('detail-replay').addEventListener('click',play);
  document.getElementById('still').addEventListener('click',still);
  document.querySelector('.header-action').addEventListener('click',()=>{still();requestAnimationFrame(()=>requestAnimationFrame(()=>{const block=document.querySelector('[data-block="closing"]');if(block)block.scrollIntoView({behavior:reduce.matches?'auto':'smooth',block:'center'});}));});
  document.getElementById('open-detail').addEventListener('click',()=>{dialog.showModal();render(current);});
  document.getElementById('close-detail').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  reduce.addEventListener('change',()=>{if(reduce.matches)still();});
  const parameters=new URLSearchParams(location.search),exporting=parameters.has('export');
  if(exporting)document.body.classList.add('export');
  document.fonts.ready.then(()=>{
    const fixed=Number(parameters.get('frame'));
    if(parameters.has('frame')&&Number.isFinite(fixed)){document.documentElement.classList.add('fixed-frame');render(Math.max(0,Math.min(DURATION,fixed)));return;}
    if((exporting&&!parameters.has('animate'))||reduce.matches||false)still();else play();
  });
  window.masterPreview={setTime(seconds){cancelAnimationFrame(animation);animation=0;render(Math.max(0,Math.min(DURATION,seconds)));},play,still};
})();
