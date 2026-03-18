const smallWords = [
"and","or","the","of","in","for","to","a","an","on","at","by","with"
];

function titleCase(text){
let words = text.toLowerCase().split(" ");
for(let i=0;i<words.length;i++){
if(i===0 || !smallWords.includes(words[i])){
words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
}
}
return words.join(" ");
}

function sentenceCase(text){
text = text.toLowerCase();
if(text.length===0) return "";
return text.charAt(0).toUpperCase() + text.slice(1);
}

function checkCase(){
let textarea = document.getElementById("input");
let text = textarea.value.trim();  // Get + trim whitespace
if(text.length === 0) {
  return;  // Exit early - do nothing
}
document.getElementById("explanation").style.display = "block";
let start = textarea.selectionStart;
let end = textarea.selectionEnd;
let before = text.substring(0,start);
let selected = text.substring(start,end);
let after = text.substring(end);
let explanation = [];
before = sentenceCase(before);
explanation.push(
"The BC Government Writing Style Guide recommends using <strong>sentence case</strong> for most text. Only the first word and proper nouns should be capitalized."
);
if(selected.length>0){
selected = titleCase(selected);
explanation.push(
"The highlighted text was treated as an <strong>official program name or proper noun</strong>, so it was converted to title case. The BC style guide allows capitalization for the formal names of programs and services."
);
}else{
explanation.push(
"No program name or proper nouns were highlighted, so the tool converted the text to sentence case."
);
}
after = after.toLowerCase();
let result = before + selected + after;
document.getElementById("output").innerHTML = highlightChanges(text,result);
document.getElementById("explanation").innerHTML = explanation.join("<br><br>");
}

function resetTool(){
document.getElementById("explanation").style.display = "none";
document.getElementById("input").value="";
document.getElementById("output").textContent="";
document.getElementById("explanation").innerHTML="";
}

function highlightChanges(original, corrected){
  let o = original.split(" ");
  let c = corrected.split(" ");
  let output = [];
  for(let i=0; i<c.length; i++){
    if(o[i] !== c[i] && c[i].length > 0){
      let firstLetter = c[i].charAt(0);
      let rest = c[i].slice(1);
      output.push("<span class='changed'><strong>" + firstLetter + "</strong>" + rest + "</span>");
    } else {
      output.push(c[i]);
    }
  }
  return output.join(" ");
}


document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.getElementById('input');
  textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();  // Stops new line in textarea
      checkCase();
    }
  });
});
