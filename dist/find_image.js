!function(){const t=location.hash.indexOf("?"),n=new URLSearchParams(location.hash.slice(t+1)).get("highlight");if(!n)return alert("Cannot search for missing target.");let i=prompt("Enter a delay in milliseconds:",500);if(!i)return;if(!(i|=0))return alert("Invalid delay.");const e=$(".ir-thumbnail-container");(function t(){const o=e.find(`.buttons-right a[href$="=${n}"]`);if(o.length){const t=o.closest(".ir-thumbnail");return t.find(".glyphicon-ok").click(),t[0].scrollIntoView()}const r=$("li:not(.disabled) > a:contains(Next)");return r.length?(r.click(),setTimeout(t,i,n,e,i)):alert("Could not find target.")})()}();