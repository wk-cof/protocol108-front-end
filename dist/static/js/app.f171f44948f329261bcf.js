webpackJsonp([1],{"/AuU":function(t,n){},"0sKC":function(t,n){},"9M+g":function(t,n){},D4uH:function(t,n,e){"use strict";function o(){return"fa-"+(c++).toString(16)}function i(t){e("/AuU")}var a={},r={name:"icon",props:{name:{type:String,validator:function(t){return t?t in a||(console.warn('Invalid prop: prop "name" is referring to an unregistered icon "'+t+'".\nPlesase make sure you have imported this icon before using it.'),!1):(console.warn('Invalid prop: prop "name" is required.'),!1)}},scale:[Number,String],spin:Boolean,inverse:Boolean,pulse:Boolean,flip:{validator:function(t){return"horizontal"===t||"vertical"===t}},label:String},data:function(){return{x:!1,y:!1,childrenWidth:0,childrenHeight:0,outerScale:1}},computed:{normalizedScale:function(){var t=this.scale;return t=void 0===t?1:Number(t),isNaN(t)||t<=0?(console.warn('Invalid prop: prop "scale" should be a number over 0.',this),this.outerScale):t*this.outerScale},klass:function(){return{"fa-icon":!0,"fa-spin":this.spin,"fa-flip-horizontal":"horizontal"===this.flip,"fa-flip-vertical":"vertical"===this.flip,"fa-inverse":this.inverse,"fa-pulse":this.pulse}},icon:function(){return this.name?a[this.name]:null},box:function(){return this.icon?"0 0 "+this.icon.width+" "+this.icon.height:"0 0 "+this.width+" "+this.height},ratio:function(){if(!this.icon)return 1;var t=this.icon,n=t.width,e=t.height;return Math.max(n,e)/16},width:function(){return this.childrenWidth||this.icon&&this.icon.width/this.ratio*this.normalizedScale||0},height:function(){return this.childrenHeight||this.icon&&this.icon.height/this.ratio*this.normalizedScale||0},style:function(){return 1!==this.normalizedScale&&{fontSize:this.normalizedScale+"em"}},raw:function(){if(!this.icon||!this.icon.raw)return null;var t=this.icon.raw,n={};return t=t.replace(/\s(?:xml:)?id=["']?([^"')\s]+)/g,function(t,e){var i=o();return n[e]=i,' id="'+i+'"'}),t=t.replace(/#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,function(t,e,o,i){var a=e||i;return a&&n[a]?"#"+n[a]:t}),t}},mounted:function(){var t=this;if(!this.icon){this.$children.forEach(function(n){n.outerScale=t.normalizedScale});var n=0,e=0;this.$children.forEach(function(t){n=Math.max(n,t.width),e=Math.max(e,t.height)}),this.childrenWidth=n,this.childrenHeight=e,this.$children.forEach(function(t){t.x=(n-t.width)/2,t.y=(e-t.height)/2})}},register:function(t){for(var n in t){var e=t[n];e.paths||(e.paths=[]),e.d&&e.paths.push({d:e.d}),e.polygons||(e.polygons=[]),e.points&&e.polygons.push({points:e.points}),a[n]=e}},icons:a},c=870711,s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("svg",{class:t.klass,style:t.style,attrs:{version:"1.1",role:t.label?"img":"presentation","aria-label":t.label,x:t.x,y:t.y,width:t.width,height:t.height,viewBox:t.box}},[t._t("default",[t.icon&&t.icon.paths?t._l(t.icon.paths,function(n,o){return e("path",t._b({key:"path-"+o},"path",n,!1))}):t._e(),t._v(" "),t.icon&&t.icon.polygons?t._l(t.icon.polygons,function(n,o){return e("polygon",t._b({key:"polygon-"+o},"polygon",n,!1))}):t._e(),t._v("\b\n    "),t.icon&&t.icon.raw?[e("g",{domProps:{innerHTML:t._s(t.raw)}})]:t._e()])],2)},u=[],l={render:s,staticRenderFns:u},p=l,d=e("VU/8"),f=i,h=d(r,p,!1,f,null,null);n.a=h.exports},Dg27:function(t,n){},Jmt5:function(t,n){},NHnr:function(t,n,e){"use strict";function o(t){e("0sKC")}function i(t,n){for(var e=t+"";e.length<n;)e="0"+e;return e}function a(t){e("fQOa")}function r(t){e("Dg27")}function c(t){e("WaqF")}Object.defineProperty(n,"__esModule",{value:!0});var s=e("7+uW"),u={name:"app"},l=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},p=[],d={render:l,staticRenderFns:p},f=d,h=e("VU/8"),v=o,m=h(u,f,!1,v,null,null),w=m.exports,g=e("/ocq"),b=e("//Fk"),y=e.n(b),_=[{constant:!0,inputs:[],name:"version",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"cycle",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"executor",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"volume",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"countdown",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"sequence",type:"uint256"}],name:"validate",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"}],x="0x35df88a99dd25da942d8d99d9344495b6857eec0",S={countdown:null,countdownFormatted:null,cycle:null,initialize:null,protocolState:null,getBalance:null,executor:null,volume:null,validate:null};if("undefined"!=typeof web3){web3=new Web3(web3.currentProvider);var E=web3.eth.contract(_).at(x);S.version=function(){return new y.a(function(t,n){E.version(function(e,o){if(e)n(e);else{var i=o.toNumber();t(i)}})})},S.countdown=function(){return new y.a(function(t,n){E.countdown(function(e,o){if(e)console.warn("error getting countdown value: "+e),n(e);else{var i=o.toNumber();t(i)}})})},S.initialize=function(t){return new y.a(function(n,e){web3.eth.sendTransaction({to:x,value:t},function(t,o){t?(console.warn("protocol execution error: "+t),e(t)):(console.log("successfully executed the protocol: "+o),n(o))})})},S.cycle=function(){return new y.a(function(t,n){E.cycle(function(e,o){if(e)console.warn("error getting cycle value: "+e),n(e);else{var i=o.toNumber();console.log("cycle count: "+i),t(i)}})})},S.protocolState=function(){return S.cycle().then(function(t){return t>0?S.countdown().then(function(t){return t>0?"ACTIVE":"TERMINATED"}):"INACTIVE"})},S.getBalance=function(t){return new y.a(function(t,n){web3.eth.getBalance(x,function(e,o){if(e)console.warn("error getting current reward value: "+e),n(e);else{var i=web3.fromWei(o.toNumber(),"ether")+" ETH";console.log("current reward: "+i),t(i)}})})},S.countdownFormatted=function(){return S.countdown().then(function(t){var n=t/60|0,e=t%60;n=i(n,2),e=i(e,2);var o=t>0?n+":"+e:"𓋴𓏲𓍒:𓄿𓏱";return console.log("countdown formatted: "+o),o})},S.executor=function(){return new y.a(function(t,n){E.executor(function(e,o){if(e)console.warn("error getting last executor: "+e),n(e);else{var i=o.toString();console.log("last executor: "+i),t(i)}})})},S.volume=function(){return new y.a(function(t,n){E.volume(function(e,o){if(e)console.warn("error getting protocol volume: "+e),n(e);else{var i=web3.fromWei(o.toNumber(),"ether")+" ETH";console.log("protocol volume: "+i),t(i)}})})},S.validate=function(t){return new y.a(function(n,e){E.validate(t,function(t,o){t?(console.warn("The input is invalid: "+t),e(t)):(console.log("The input is valid"),n(o))})})}}else alert('Web3 is not supported in your browser. Did you install <a href="https://metamask.io/">MetaMask Plugin?</a>');var k=S,M=e("7t+N"),C=e.n(M);window.jQuery=C.a,e("nNbt");var I={name:"flip-clock",props:["seconds"],mounted:function(){this.init_clock(),this.set_countdown(new Date)},created:function(){},data:function(){return{countdown:null}},methods:{set_countdown:function(t){if(!this.countdown||!this.countdown.running){var n=new Date;t=new Date(t);var e=t.getTime()+1e3*this.seconds,o=Math.round((e-n.getTime())/1e3);return o<0&&(o*=-1,!0),this.countdown.setTime(o),this.countdown.start()}},init_clock:function(){this.countdown=C()(".countdown").FlipClock({clockFace:"MinuteCounter",language:"en",autoStart:!1,countdown:!0,showSeconds:!0})}}},N=function(){var t=this,n=t.$createElement;t._self._c;return t._m(0,!1,!1)},z=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"flip-clock"},[e("div",{staticClass:"countdown-wrapper"},[e("div",{staticClass:"countdown",attrs:{id:"countdown"}})])])}],F={render:N,staticRenderFns:z},q=F,T=e("VU/8"),A=a,H=T(I,q,!1,A,null,null),$=H.exports,D={data:function(){return{timer:{coundown:0,display:!1},sequenceInput:{state:!1,staticMessage:">: Swan Protocol initiated \n>: Enter Sequence",input:">: "},sendAmount:null,toasts:{displayError:!1},isExecutionSuccessful:!1,errorMessage:""}},methods:{countdown:function(){var t=this;k.countdown().then(function(n){t.timer.display=!0,t.timer.coundown=n}).catch(function(t){console.log(t)})},execute:function(){var t=this,n=void 0,e=void 0;try{var o=this.sanitizeInput(this.sequenceInput.input);n=parseInt(o)||0,e=parseInt(this.sendAmount)||1}catch(t){return this.toasts.displayError=!0,void(this.errorMessage="Input is not an integer")}k.validate(n).then(function(n){if(t.toasts.displayError=!n,n)return k.initialize(e).then(function(){t.isExecutionSuccessful=!0});t.sequenceInput.state="invalid"}).catch(function(n){console.error("Execution failed. "+n),t.errorMessage=n,t.toasts.displayError=!0})},protocolState:function(){k.protocolState().then(function(t){console.log(t)}).catch(function(t){console.error(t)})},sanitizeInput:function(t){var n=/^>?:? ?(\d+)/,e=t.match(n);return e&&e[1]?e[1]:t}},created:function(){this.countdown()},components:{"flip-clock":$}},W=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"protocol-vue"},[e("b-alert",{staticClass:"popup-alert",attrs:{variant:"danger",dismissible:"",show:t.toasts.displayError},on:{dismissed:function(n){t.toasts.displayError=!1}}},[t._v("\n    Invalid Sequence\n    ")]),t._v(" "),e("b-alert",{staticClass:"popup-alert",attrs:{variant:"success",dismissible:"",show:t.isExecutionSuccessful},on:{dismissed:function(n){t.isExecutionSuccessful=!1}}},[t._v("\n    Execution Successful\n    ")]),t._v(" "),e("div",{staticClass:"text-success",attrs:{id:"protocol-component"}},[t.timer.display?e("flip-clock",{attrs:{seconds:t.timer.coundown}}):t._e(),t._v(" "),e("b-input-group",{staticClass:"protocol-input",staticStyle:{"max-width":"400px"},attrs:{left:"wei"}},[e("b-input",{staticClass:"bg-dark text-success border-dark",attrs:{id:"sendAmount",placeholder:"1"},model:{value:t.sendAmount,callback:function(n){t.sendAmount=n},expression:"sendAmount"}})],1),t._v(" "),e("br"),t._v(" "),e("b-form-textarea",{staticClass:"protocol-input bg-dark text-success border-dark",attrs:{"no-resize":!0,rows:2,disabled:"","max-rows":2},model:{value:t.sequenceInput.staticMessage,callback:function(n){t.$set(t.sequenceInput,"staticMessage",n)},expression:"sequenceInput.staticMessage"}}),t._v(" "),e("b-form-textarea",{staticClass:"protocol-input bg-dark text-success border-dark active-input",attrs:{"no-resize":!0,rows:5,"max-rows":5},model:{value:t.sequenceInput.input,callback:function(n){t.$set(t.sequenceInput,"input",n)},expression:"sequenceInput.input"}}),t._v(" "),e("b-button",{staticClass:"execute-button",attrs:{type:"submit",variant:"success"},on:{click:t.execute}},[t._v("Execute protocol")])],1)],1)},B=[],R={render:W,staticRenderFns:B},V=R,P=e("VU/8"),U=r,J=P(D,V,!1,U,"data-v-320b6b20",null),O=J.exports,Q={data:function(){return{protocolStats:{balance:"0 ETH",countdownFormatted:"",cycleNumber:null,protocolState:"INACTIVE",lastExecutor:"",volume:"?"}}},methods:{getStatistics:function(){var t=this;k.getBalance().then(function(n){t.protocolStats.balance=n}),k.protocolState().then(function(n){t.protocolStats.protocolState=n}),k.countdownFormatted().then(function(n){t.protocolStats.countdownFormatted=n}),k.cycle().then(function(n){t.protocolStats.cycleNumber=n}),k.executor().then(function(n){t.protocolStats.lastExecutor=n}),k.volume().then(function(n){t.protocolStats.volume=n})}},created:function(){this.getStatistics()}},j=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"text-success bg-dark"},[e("ul",[e("li",[t._v("Protocol state: "+t._s(t.protocolStats.protocolState))]),t._v(" "),e("li",[t._v("Countdown: "+t._s(t.protocolStats.countdownFormatted))]),t._v(" "),e("li",[t._v("Balance: "+t._s(t.protocolStats.balance))]),t._v(" "),e("li",[t._v("Cycle number: "+t._s(t.protocolStats.cycleNumber))]),t._v(" "),e("li",[t._v("Volume: "+t._s(t.protocolStats.volume))]),t._v(" "),e("li",[t._v("Last executor: "+t._s(t.protocolStats.lastExecutor))])]),t._v(" "),e("b-button",{attrs:{variant:"success"},on:{click:t.getStatistics}},[t._v("Refresh")])],1)},K=[],L={render:j,staticRenderFns:K},G=L,X=e("VU/8"),Y=c,Z=X(Q,G,!1,Y,"data-v-c929c59e",null),tt=Z.exports;e("Jmt5"),e("9M+g");s.a.use(g.a);var nt=new g.a({routes:[{path:"/",name:"Protocol",component:O},{path:"/details",name:"Details",component:tt},{path:"/flip",name:"FlipClock",component:$}]}),et=e("sCSS"),ot=(e("Epmo"),e("D4uH"));e("t1aR");s.a.component("icon",ot.a),s.a.config.productionTip=!1,s.a.use(et.a),new s.a({el:"#app",router:nt,template:"<App/>",components:{App:w}})},WaqF:function(t,n){},fQOa:function(t,n){},t1aR:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.f171f44948f329261bcf.js.map