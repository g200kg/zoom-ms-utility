function apatch(){
  this.devid=0x00;
  this.name="";
  this.fx=[
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0],
  ];
  this.bpm=120;
  this.maxfx=1;
  this.curfx=0;
  this.dspstate=0;
}
apatch.prototype.CopyFrom=function(a){
  this.devid=a.devid;
  this.name=a.name.slice(0);
  for(var i=0;i<6;++i)
    for(var j=0;j<11;++j)
      this.fx[i][j]=a.fx[i][j];
  this.bpm=a.bpm;
  this.maxfx=a.maxfx;
  this.curfx=a.curfx;
  this.dspstate=0;
};
apatch.prototype.empty146=[
  0xf0,0x52,0x00,0x58,0x28,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x05,0x0f,0x45,0x00,0x6d,0x70,0x74,0x79,0x20,0x20,
  0x20,0x00,0x20,0x20,0x00,0xf7
];
apatch.prototype.empty105=[
  0xf0,0x52,0x00,0x5f,0x28,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
  0x00,0x00,0x00,0x00,0x00,0x10,0x00,0x00,0x40,0x04,0x0f,0x45,0x6d,0x00,0x70,0x74,0x79,0x20,0x20,0x20,
  0x20,0x00,0x20,0x00,0xf7
];
apatch.prototype.SetEmpty=function(devid){
  if(typeof(devid)=="undefined") devid=this.devid;
  this.ReadBin(devid==0x5f?this.empty105:this.empty146);
  this.devid=devid;
}
apatch.prototype.bits=[
  [ //eff0
    [[6,1,0]],  //State
    [[6,0x7e,-1],[5,0x40,0],[7,0x7f,7],[5,0x20,9],[8,0x7f,15],[5,0x10,18],[9,0x1f,23]], //ID
    [[9,0x60,-5],[5,0x8,-1],[10,0x7f,3],[5,0x4,8],[11,0x1,11]],  //Params2-
    [[11,0x7c,-2],[5,0x2,4],[12,0x1f,6]],
    [[5,0x1,0],[14,0x7f,1],[13,0x40,2],[15,0x3,9]],
    [[15,0x70,-4],[13,0x20,-2],[16,0x0f,4]],
    [[16,0x70,-4],[13,0x10,-1],[17,0x0f,4]],
    [[17,0x70,-4],[13,0x08,0],[18,0x0f,4]],
    [[18,0x70,-4],[13,0x04,1],[19,0x0f,4]],
    [[19,0x70,-4],[13,0x02,2],[20,0x7f,4],[13,0x01,11],[22,0x7f,12],[21,0x40,13],[23,0x7f,20],[21,0x20,22]],
    [[24,0x7f,0],[21,0x10,3]],
  ],
  [ //eff1
    [[26,1,0]], //State
    [[26,0x7e,-1],[21,0x04,4],[27,0x7f,7],[21,0x02,13],[28,0x7f,15],[21,0x01,22],[30,0x1f,23]], //ID
    [[30,0x60,-5],[29,0x40,-4],[31,0x7f,3],[29,0x20,5],[32,0x1,11]],
    [[32,0x7c,-2],[29,0x10,1],[33,0x1f,6]],
    [[29,0x8,-3],[34,0x7f,1],[29,0x4,6],[35,0x3,9]],
    [[35,0x70,-4],[29,0x2,2],[36,0x0f,4]],
    [[36,0x70,-4],[29,0x1,3],[38,0x0f,4]],
    [[38,0x70,-4],[37,0x40,-3],[39,0x0f,4]],
    [[39,0x70,-4],[37,0x20,-2],[40,0x0f,4]],
    [[40,0x70,-4],[37,0x10,-1],[41,0x7f,4],[37,0x08,8],[42,0x7f,12],[37,0x04,17],[43,0x7f,20],[37,0x02,26]],
    [[44,0x7f,0],[37,0x1,7]],
  ],
  [ //eff2
    [[47,1,0]], //State
    [[47,0x7e,-1],[45,0x20,1],[48,0x7f,7],[45,0x10,10],[49,0x7f,15],[45,0x08,19],[50,0x1f,23]], //ID
    [[50,0x60,-5],[45,0x4,0],[51,0x7f,3],[45,0x2,9],[52,0x1,11]],
    [[52,0x7c,-2],[45,0x1,5],[54,0x1f,6]],
    [[53,0x40,-6],[55,0x7f,1],[53,0x20,3],[56,0x3,9]],
    [[56,0x70,-4],[53,0x10,-1],[57,0x0f,4]],
    [[57,0x70,-4],[53,0x8,0],[58,0x0f,4]],
    [[58,0x70,-4],[53,0x4,1],[59,0x0f,4]],
    [[59,0x70,-4],[53,0x2,2],[60,0x0f,4]],
    [[60,0x70,-4],[53,0x01,3],[62,0x7f,4],[61,0x40,5],[63,0x7f,12],[61,0x20,14],[64,0x7f,20],[61,0x10,23]],
    [[65,0x7f,0],[61,0x8,4]],
  ],
  [ //eff3
    [[67,1,0]], //State
    [[67,0x7e,-1],[61,0x02,5],[68,0x7f,7],[61,0x01,14],[70,0x7f,15],[69,0x40,16],[71,0x1f,23]], //ID
    [[71,0x60,-5],[69,0x20,-3],[72,0x7f,3],[69,0x10,6],[73,0x1,11]],
    [[73,0x7c,-2],[69,0x8,2],[74,0x1f,6]],
    [[69,0x4,-2],[75,0x7f,1],[69,0x2,7],[76,0x3,9]],
    [[76,0x70,-4],[69,0x1,3],[78,0x0f,4]],
    [[78,0x70,-4],[77,0x40,-3],[79,0x0f,4]],
    [[79,0x70,-4],[77,0x20,-2],[80,0x0f,4]],
    [[80,0x70,-4],[77,0x10,-1],[81,0x0f,4]],
    [[81,0x70,-4],[77,0x08,0],[82,0x7f,4],[77,0x04,9],[83,0x7f,12],[77,0x02,18],[84,0x7f,20],[77,0x01,27]],
    [[86,0x7f,0],[85,0x40,1]],
  ],
  [ //eff4
    [[88,1,0]], //State
    [[88,0x7e,-1],[85,0x10,2],[89,0x7f,7],[85,0x08,11],[90,0x7f,15],[85,0x04,20],[91,0x1f,23]], //ID
    [[91,0x60,-5],[85,0x2,1],[92,0x7f,3],[85,0x1,10],[94,0x1,11]],
    [[94,0x7c,-2],[93,0x40,-1],[95,0x1f,6]],
    [[93,0x20,-5],[96,0x7f,1],[93,0x10,4],[97,0x3,9]],
    [[97,0x70,-4],[93,0x8,0],[98,0x0f,4]],
    [[98,0x70,-4],[93,0x4,1],[99,0x0f,4]],
    [[99,0x70,-4],[93,0x2,2],[100,0x0f,4]],
    [[100,0x70,-4],[93,0x1,3],[102,0x0f,4]],
    [[102,0x70,-4],[101,0x40,-3],[103,0x7f,4],[101,0x20,6],[104,0x7f,12],[101,0x10,15],[105,0x7f,20],[101,0x08,24]],
    [[106,0x7f,0],[101,0x4,5]],
  ],
  [ //eff5
    [[108,1,0]],  //State
    [[108,0x7e,-1],[101,0x01,6],[110,0x7f,7],[109,0x40,8],[111,0x7f,15],[109,0x20,17],[112,0x1f,23]], //ID
    [[112,0x60,-5],[109,0x10,-2],[113,0x7f,3],[109,0x8,7],[114,0x1,11]],
    [[114,0x7c,-2],[109,0x4,3],[115,0x1f,6]],
    [[109,0x2,-1],[116,0x7f,1],[109,0x1,8],[118,0x3,9]],
    [[118,0x70,-4],[117,0x40,-3],[119,0x0f,4]],
    [[119,0x70,-4],[117,0x20,-2],[120,0x0f,4]],
    [[120,0x70,-4],[117,0x10,-1],[121,0x0f,4]],
    [[121,0x70,-4],[117,0x8,0],[122,0x0f,4]],
    [[122,0x70,-4],[117,0x04,1],[123,0x7f,4],[117,0x02,10],[124,0x7f,12],[117,0x01,19],[126,0x7f,20],[125,0x40,21]],
    [[127,0x7f,0],[125,0x20,2]],
  ]
];
apatch.prototype.dspstatebits=[
  [[88,0x3f,0]],
  [[129,0x3f,0]],
];
apatch.prototype.curfxbits=[
  [[88,0x40,-6],[85,0x10,-3],[89,0x03,2]],
  [[129,0x40,-6],[125,0x08,-2],[130,0x03,2]],
];
apatch.prototype.maxfxbits=[
  [[89,0x1c,-2]],
  [[130,0x1c,-2]],
];
apatch.prototype.bpmbits=[
  [[89,0x60,-5],[85,0x08,-1],[90,0x1f,3]],
  [[130,0x60,-5],[125,0x04,0],[131,0x1f,3]]
];
apatch.prototype.namidx=[
  [91,92,94,95,96,97,98,99,100,102],
  [132,134,135,136,137,138,139,140,142,143]
];
apatch.prototype.GetParamVal=function(n,p){
  return this.fx[n][p];
}
apatch.prototype.SetParamVal=function(n,p,v){
  this.fx[n][p]=v;
}
apatch.prototype.GetEffectId=function(n){
  return this.fx[n][1];
};
apatch.prototype.GetEffectState=function(n){
  return this.fx[n][0];
};
apatch.prototype.GetDspState=function(n){
  return (this.dspstate>>n)&1;
}
apatch.prototype.GetCurFx=function(){
  return this.curfx;
};
apatch.prototype.SetCurFx=function(v){
 this.curfx=Math.max(0,Math.min(5,v)); // should be limited by maxfx, but no guarantee it was already updated
};
apatch.prototype.GetBpm=function(){
  return this.bpm;
};
apatch.prototype.SetBpm=function(v){
 this.bpm=Math.max(1,Math.min(255,v));
};
apatch.prototype.GetCurFxBit=function(dat){
  var bits=(dat.length<146?this.curfxbits[0]:this.curfxbits[1]);
  var val=(dat.length<146?4:6)-this.GetBits(dat,bits)-1
  return (val<0?0:val);
};
apatch.prototype.SetCurFxBit=function(dat,n){
  var bits=(dat.length<146?this.curfxbits[0]:this.curfxbits[1]);
  var val=(dat.length<146?4:6)-n-1;
  this.SetBits(dat,bits,(val>5?5:val));
}
apatch.prototype.GetMaxFxBit=function(dat){
  var bits=(dat.length<146?this.maxfxbits[0]:this.maxfxbits[1]);
  var val=this.GetBits(dat,bits);
  return (val>6?6:val);
};
apatch.prototype.SetMaxFxBit=function(dat,n){
  var bits=(dat.length<146?this.maxfxbits[0]:this.maxfxbits[1]);
  this.SetBits(dat,bits,Math.min((dat.length<146)?4:6,Math.max(1,n)));
};
apatch.prototype.SetDspStateBit=function(dat,val){
  var bits=(dat.length<146?this.dspstatebits[0]:this.dspstatebits[1]);
  this.SetBits(dat,bits,(val<=0?0:(val>0x3f?0x3f:val)));
};
apatch.prototype.GetDspStateBit=function(dat){
  var bits=(dat.length<146?this.dspstatebits[0]:this.dspstatebits[1]);
  var val=this.GetBits(dat,bits);
  return (val>0?val:0);
};
apatch.prototype.SetBpmBit=function(dat,val){
  var bits=(dat.length<146?this.bpmbits[0]:this.bpmbits[1]);
  this.SetBits(dat,bits,(val<=0?120:(val>255?255:val)));
};
apatch.prototype.GetBpmBit=function(dat){
  var bits=(dat.length<146?this.bpmbits[0]:this.bpmbits[1]);
  var val=this.GetBits(dat,bits);
  return (val>0?val:120);
};
apatch.prototype.SetBits=(dat,bits,val)=>{
  var len=dat.length;
  var blen=bits.length;
  for(var i=0;i<blen;++i){
    var b0=bits[i];
    var bb,v;
    if(b0[0]<len){
      if(b0[2]==="NZ"){
        dat[b0[0]]=(dat[b0[0]]&~b0[1])+(val!=0?b0[1]:0);
      }
      else{
        if(b0[2]>=0)
          v=val>>b0[2];
        else
          v=val<<-b0[2];
        dat[b0[0]]=(dat[b0[0]]&~b0[1])+(v&b0[1]);
      }
    }
  }
};
apatch.prototype.GetBits=(dat,bits)=>{
  var len=dat.length;
  var val=0;
  for(var i=0;i<bits.length;++i){
    var b0=bits[i];
    if(b0[0]<len && b0[2]!=="NZ"){
      var r=b0[0];
      if(r<len){
        var v=dat[b0[0]]&b0[1];
        if(b0[2]>=0)
          v<<=b0[2];
        else
          v>>=-b0[2];
        val|=v;
      }
    }
  }
  return val;
};
apatch.prototype.ReadBin=function(dat){
  this.devid=dat[3];
  var len=dat.length;
  var name="";
  for(var j=0;j<13;++j){
    var c=dat[((len>=146)?132:91)+j];
    if(c)
      name+=String.fromCharCode(c);
  }
  this.name=name.replace(/ +$/,"");
  var flen=(len>=146)?6:4;
  for(var f=0;f<6;++f){
    for(var p=0;p<11;++p){
      if(f>=flen)
        this.fx[f][p]=0;
      else
        this.fx[f][p]=this.GetBits(dat,this.bits[f][p]);
    }
  }
  this.bpm=this.GetBpmBit(dat);
  this.maxfx=this.GetMaxFxBit(dat);
  this.curfx=this.GetCurFxBit(dat);
  this.dspstate=this.GetDspStateBit(dat)
//  console.log("ReadBin:(devid:0x"+this.devid.toString(16)+") patch:'"+this.name+"' maxfx:"+this.maxfx+" curfx:"+this.curfx+" bpm:"+this.bpm+" dspstate:0x"+this.dspstate.toString(16));
};
apatch.prototype.MakeBin=function(id,effectlistlocal){
  var i,r,flen;
  if(id==0x5f){
    r=this.empty105.slice(0);
    flen=4;
  }
  else{
    r=this.empty146.slice(0);
    flen=6;
  }
  r[3]=id;
  var len=r.length;
  var name=this.name;
  if(name.length>10)
    name=name.substr(0,10);
  for(i=0;i<10;++i){
    var c=name.charCodeAt(i);
    r[this.namidx[(id==0x5f)?0:1][i]]=(isNaN(c)?0x20:c);
  }
  for(var f=0;f<flen;++f){
    for(var p=0;p<11;++p){
      this.SetBits(r,this.bits[f][p],this.fx[f][p]);
    }
//    var ef=(effectlistlocal || effectlist)[this.fx[f][1]];
//    if(ef && ef.group=="AMP"){
//      var cabid=this.fx[f][9];
//    }
  }
  i=(len>=146?5:3);
  while(i>0){
    if(this.fx[i][1]!=0)
      break;
    --i;
  }
  this.SetMaxFxBit(r,i+1);
  this.SetCurFxBit(r,this.curfx);
  this.SetBpmBit(r,this.bpm);
  this.SetDspStateBit(r,this.dspstate);
//  console.log("MakeBin:(devid:0x"+this.devid.toString(16)+") patch:'"+this.name+"' curfx:"+this.curfx+" bpm:"+this.bpm+" dspstate:0x"+this.dspstate.toString(16));
  return r;
};
var nullpatch=new apatch();
if(typeof module === 'object'){module.exports=apatch;}
