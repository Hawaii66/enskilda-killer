import Top from "@/components/Top";
import React from "react";

async function GetData() {
  const text = `Enskildas Elevkår är en förening som vi elever på skolan har möjlighet att vara medlemmar i. Enskildakårens mål är att skapa en så rolig och bra skolgång som möjligt för alla elever på skolan och fixar därför en rad olika aktiviteter under läsårets gång.
<br/><br/>
	Som medlem behöver du inte göra någonting mer än att få vara en del av alla härligheter på skolan, tack vare att du och dina vänner är medlemmar i Enskildas elevkår har vi i styrelsen möjligheten och pengarna till att t.ex. köpa in priser till våra olika tävlingar.
	<br/><br/>
	Tack för att DU är medlem!
	<br/><br/>
	
	Med vänliga hälsningar
	<br/><br/>
	Enskildkårens styrelse`;

  return text;
}

async function page() {
  const data = await GetData();

  return (
    <div>
      <Top text="Enskilda Kåren" />
      <div className="flex justify-center items-center">
        <div
          className="w-1/2 text-center pt-4 font-serif text-lg font-medium text-black"
          dangerouslySetInnerHTML={{ __html: data }}
        ></div>
      </div>
    </div>
  );
}

export default page;
