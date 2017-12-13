webpackJsonp([1],{"9M+g":function(t,e){},"9tb0":function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";function o(t){n("9tb0")}function a(t,e){for(var n=t+"";n.length<e;)n="0"+n;return n}function c(t){n("tW2H")}function u(t){n("QZK1")}Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),i={name:"app"},s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"dark"}},[n("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),t._v(" "),n("b-navbar-brand",{attrs:{href:"#/"}},[t._v("Protocol108")]),t._v(" "),n("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{href:"#/"}},[t._v("Home")]),t._v(" "),n("b-nav-item",{attrs:{href:"#/details"}},[t._v("Details")])],1),t._v(" "),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-item",{attrs:{right:"",href:"https://github.com/vgorin/protocol108",target:"_blank"}},[t._v("Github")])],1)],1)],1),t._v(" "),n("router-view")],1)},l=[],v={render:s,staticRenderFns:l},d=v,p=n("VU/8"),f=o,m=p(i,d,!1,f,null,null),b=m.exports,w=n("/ocq"),h=n("//Fk"),_=n.n(h),g=[{constant:!0,inputs:[],name:"version",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"cycle",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"executor",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"volume",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"countdown",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"sequence",type:"uint256"}],name:"validate",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"}],y="0x35df88a99dd25da942d8d99d9344495b6857eec0",S={countdown:null,countdownFormatted:null,cycle:null,initialize:null,protocolState:null,getBalance:null,executor:null,volume:null,validate:null};if("undefined"!=typeof web3){web3=new Web3(web3.currentProvider);var x=web3.eth.contract(g).at(y);S.version=function(){return new _.a(function(t,e){x.version(function(n,o){if(n)e(n);else{var a=o.toNumber();t(a)}})})},S.countdown=function(){return new _.a(function(t,e){x.countdown(function(n,o){if(n)console.warn("error getting countdown value: "+n),e(n);else{var a=o.toNumber();t(a)}})})},S.initialize=function(t){return new _.a(function(e,n){web3.eth.sendTransaction({to:y,value:t},function(t,o){t?(console.warn("protocol execution error: "+t),n(t)):(console.log("successfully executed the protocol: "+o),e(o))})})},S.cycle=function(){return new _.a(function(t,e){x.cycle(function(n,o){if(n)console.warn("error getting cycle value: "+n),e(n);else{var a=o.toNumber();console.log("cycle count: "+a),t(a)}})})},S.protocolState=function(){return S.cycle().then(function(t){return t>0?S.countdown().then(function(t){return t>0?"ACTIVE":"TERMINATED"}):"INACTIVE"})},S.getBalance=function(t){return new _.a(function(t,e){web3.eth.getBalance(y,function(n,o){if(n)console.warn("error getting current reward value: "+n),e(n);else{var a=web3.fromWei(o.toNumber(),"ether")+" ETH";console.log("current reward: "+a),t(a)}})})},S.countdownFormatted=function(){return S.countdown().then(function(t){var e=t/60|0,n=t%60;e=a(e,2),n=a(n,2);var o=t>0?e+":"+n:"𓋴𓏲𓍒:𓄿𓏱";return console.log("countdown formatted: "+o),o})},S.executor=function(){return new _.a(function(t,e){x.executor(function(n,o){if(n)console.warn("error getting last executor: "+n),e(n);else{var a=o.toString();console.log("last executor: "+a),t(a)}})})},S.volume=function(){return new _.a(function(t,e){x.volume(function(n,o){if(n)console.warn("error getting protocol volume: "+n),e(n);else{var a=web3.fromWei(o.toNumber(),"ether")+" ETH";console.log("protocol volume: "+a),t(a)}})})},S.validate=function(t){return new _.a(function(e,n){x.validate(t,function(t,o){t?(console.warn("The input is invalid: "+t),n(t)):(console.log("The input is valid"),e(o))})})}}else alert('Web3 is not supported in your browser. Did you install <a href="https://metamask.io/">MetaMask Plugin?</a>');var E=S,q=n("vwpt"),I=n.n(q),M=new I.a,V={data:function(){return{coundown:0,sequenceInput:"",sendAmount:1,isSequenceValid:!0,isExecutionSuccessful:!1,errorMessage:"",time:"Loading timer"}},methods:{countdown:function(){var t=this;E.countdown().then(function(e){M.start({countdown:!0,startValues:{seconds:e}}),M.addEventListener("secondsUpdated",function(e){t.time=M.getTimeValues().toString()})}).catch(function(t){console.log(t)})},execute:function(){var t=this,e=void 0,n=void 0;try{e=parseInt(this.sequenceInput)||0,n=parseInt(this.sendAmount)||1}catch(t){return this.isSequenceValid=!1,void(this.errorMessage="Input is not an integer")}E.validate(e).then(function(e){if(t.isSequenceValid=e,e)return E.initialize(n).then(function(){t.isExecutionSuccessful=!0})}).catch(function(e){console.error("Execution failed. "+e),t.errorMessage=e,t.isSequenceValid=!1})},protocolState:function(){E.protocolState().then(function(t){console.log(t)}).catch(function(t){console.error(t)})}},created:function(){this.countdown()}},N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h3",[t._v("Protocol 108")]),t._v(" "),n("b-alert",{attrs:{variant:"danger",dismissible:"",show:!t.isSequenceValid},on:{dismissed:function(e){t.isSequenceValid=!0}}},[t._v("\n    Invalid Sequence\n    ")]),t._v(" "),n("b-alert",{attrs:{variant:"success",dismissible:"",show:t.isExecutionSuccessful},on:{dismissed:function(e){t.isExecutionSuccessful=!1}}},[t._v("\n    Execution Successful\n    ")]),t._v(" "),n("div",[t._v(t._s(t.time))]),t._v(" "),n("b-form",{attrs:{inline:""}},[n("label",{staticClass:"sr-only",attrs:{for:"sequenceInput"}},[t._v("Sequence")]),t._v(" "),n("b-input",{attrs:{id:"sequenceInput",placeholder:"Sequence"},model:{value:t.sequenceInput,callback:function(e){t.sequenceInput=e},expression:"sequenceInput"}}),t._v(" "),n("b-input-group",{staticClass:"mb-2 mr-sm-2 mb-sm-0",attrs:{left:"wei"}},[n("b-input",{attrs:{id:"sendAmount",placeholder:"1"},model:{value:t.sendAmount,callback:function(e){t.sendAmount=e},expression:"sendAmount"}})],1),t._v(" "),n("b-button",{attrs:{type:"submit",variant:"primary"},on:{click:t.execute}},[t._v("Execute protocol")])],1)],1)},T=[],A={render:N,staticRenderFns:T},k=A,F=n("VU/8"),C=c,H=F(V,k,!1,C,"data-v-58a3ec00",null),P=H.exports,W={data:function(){return{protocolStats:{balance:"0 ETH",countdownFormatted:"",cycleNumber:null,protocolState:"INACTIVE",lastExecutor:"",volume:"?"}}},methods:{getStatistics:function(){var t=this;E.getBalance().then(function(e){t.protocolStats.balance=e}),E.protocolState().then(function(e){t.protocolStats.protocolState=e}),E.countdownFormatted().then(function(e){t.protocolStats.countdownFormatted=e}),E.cycle().then(function(e){t.protocolStats.cycleNumber=e}),E.executor().then(function(e){t.protocolStats.lastExecutor=e}),E.volume().then(function(e){t.protocolStats.volume=e})}},created:function(){this.getStatistics()}},B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ul",[n("li",[t._v("Protocol state: "+t._s(t.protocolStats.protocolState))]),t._v(" "),n("li",[t._v("Countdown: "+t._s(t.protocolStats.countdownFormatted))]),t._v(" "),n("li",[t._v("Balance: "+t._s(t.protocolStats.balance))]),t._v(" "),n("li",[t._v("Cycle number: "+t._s(t.protocolStats.cycleNumber))]),t._v(" "),n("li",[t._v("Volume: "+t._s(t.protocolStats.volume))]),t._v(" "),n("li",[t._v("Last executor: "+t._s(t.protocolStats.lastExecutor))])]),t._v(" "),n("b-button",{attrs:{variant:"primary"},on:{click:t.getStatistics}},[t._v("Refresh")])],1)},R=[],D={render:B,staticRenderFns:R},U=D,z=n("VU/8"),J=u,L=z(W,U,!1,J,"data-v-985c7ee8",null),$=L.exports;n("Jmt5"),n("9M+g");r.a.use(w.a);var K=new w.a({routes:[{path:"/",name:"Protocol",component:P},{path:"/details",name:"Details",component:$}]}),Q=n("sCSS");r.a.config.productionTip=!1,r.a.use(Q.a),new r.a({el:"#app",router:K,template:"<App/>",components:{App:b}})},QZK1:function(t,e){},tW2H:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.141740ba6e84e3e01c04.js.map