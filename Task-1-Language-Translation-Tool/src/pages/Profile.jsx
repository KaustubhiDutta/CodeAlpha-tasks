const history =
  JSON.parse(
    localStorage.getItem(
      "translationHistory"
    )
  ) || [];
  {history.map(item => (
  <div
    key={item.id}
    className="p-3 border-b border-gray-700"
  >
    <p>{item.sourceText}</p>

    <p className="text-teal-400">
      {item.translatedText}
    </p>
  </div>
))} 
localStorage.setItem(
  "preferredLanguage",
  targetLang
);
const saved =
  localStorage.getItem(
    "preferredLanguage"
  );

if(saved){
  setTargetLang(saved);
}