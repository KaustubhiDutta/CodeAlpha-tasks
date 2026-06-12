import React, {
  useState,
  useEffect
} from "react";

import { LANGUAGES }
from "../../data/languages";

import { X } from "lucide-react";

const ProfileModal = ({
  open,
  onClose
}) => {

  const [historyData,
    setHistoryData] =
    useState([]);

  const [preferredLanguage,
    setPreferredLanguage] =
    useState("Not Set");

  const [favoriteDestination,
    setFavoriteDestination] =
    useState(null);

  const [travellerName,
    setTravellerName] =
    useState("");

  useEffect(() => {

    if (!open) return;

    const history =
      JSON.parse(
        localStorage.getItem(
          "translationHistory"
        )
      ) || [];

    setHistoryData(history);

    const languageCode =
      localStorage.getItem(
        "preferredLanguage"
      );

    const languageName =
      LANGUAGES.find(
        l => l.code === languageCode
      )?.name || "Not Set";

    setPreferredLanguage(
      languageName
    );

    const destination =
      JSON.parse(
        localStorage.getItem(
          "favoriteDestination"
        )
      );

    setFavoriteDestination(
      destination
    );

    const savedName =
      localStorage.getItem(
        "travellerName"
      ) || "Traveller";

    setTravellerName(
      savedName
    );

  }, [open]);

  if (!open) return null;

  return (

<div
className="
fixed
inset-0
bg-black/70
flex
justify-center
items-center
p-4
z-50
"
>

<div
className="
bg-gray-900
w-[95%]
max-w-md
max-h-[90vh]
overflow-y-auto
rounded-2xl
p-5
border
border-gray-700
"
>

{/* HEADER */}

<div className="flex justify-between items-center mb-4">

<h2 className="text-xl font-bold text-white">
Profile
</h2>

<button
onClick={onClose}
className="
text-gray-400
hover:text-white
"
>
<X size={20}/>
</button>

</div>

{/* PROFILE CARD */}

<div
className="
bg-gray-800
rounded-xl
p-3
mb-4
"
>

<div className="text-3xl mb-1">
✈️
</div>

<h3 className="text-lg font-bold text-white">
{travellerName || "Traveller"}
</h3>

<p className="text-gray-400 text-sm">
Ready for the next journey
</p>

</div>

{/* NAME */}

<div className="mb-4">

<p className="text-gray-400 mb-1 text-sm">
Traveller Name
</p>

<input
value={travellerName}
onChange={(e) => {

setTravellerName(
e.target.value
);

localStorage.setItem(
"travellerName",
e.target.value
);

}}
placeholder="Enter your name"
className="
w-full
bg-gray-800
border
border-gray-700
rounded-lg
px-3
py-2
text-sm
text-white
"
/>

</div>

{/* STATS */}

<div className="space-y-3 text-sm">

<div>

<p className="text-gray-400">
Preferred Language
</p>

<p className="text-cyan-400">
{preferredLanguage}
</p>

</div>

<div>

<p className="text-gray-400">
Favorite Destination
</p>

<p className="text-cyan-400">
{
favoriteDestination?.name ||
favoriteDestination?.city ||
favoriteDestination?.country ||
"None"
}
</p>

</div>

<div>

<p className="text-gray-400">
Total Translations
</p>

<p className="text-cyan-400">
{historyData.length}
</p>

</div>

</div>

{/* HISTORY */}

<div className="mt-5">

<h3 className="text-white font-semibold mb-3">
Recent History
</h3>

<div className="max-h-40 overflow-y-auto">

{
historyData.length === 0 ? (

<p className="text-gray-500 text-sm">
No translations yet
</p>

) : (

historyData
.slice(0, 10)
.map(item => (

<div
key={item.id}
className="
p-2
border-b
border-gray-700
"
>

<p className="text-white text-xs">
🗣️ {item.sourceText}
</p>

<p className="text-teal-400 text-xs mt-1">
🌍 {item.translatedText}
</p>

<p className="text-gray-500 text-[10px] mt-1">
{item.sourceLang?.toUpperCase()}
 →
{item.targetLang?.toUpperCase()}
</p>

</div>

))
)}

</div>

</div>

{/* CLEAR */}

<button
onClick={() => {

localStorage.removeItem(
"translationHistory"
);

localStorage.removeItem(
"preferredLanguage"
);

localStorage.removeItem(
"favoriteDestination"
);

localStorage.removeItem(
"travellerName"
);

setHistoryData([]);
setPreferredLanguage(
"Not Set"
);
setFavoriteDestination(
null
);
setTravellerName(
""
);

onClose();

}}
className="
mt-5
w-full
bg-red-500
hover:bg-red-600
py-2
rounded-lg
text-sm
text-white
transition
"
>
Clear All Data
</button>

</div>

</div>

  );
};

export default ProfileModal;