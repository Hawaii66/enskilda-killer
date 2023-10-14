"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

function EnskildaKaren() {
  const [text, setText] =
    useState(`Enskildas Elevkår är en förening som vi elever på skolan har möjlighet att vara medlemmar i. Enskildakårens mål är att skapa en så rolig och bra skolgång som möjligt för alla elever på skolan och fixar därför en rad olika aktiviteter under läsårets gång.
	<br/><br/>
		Som medlem behöver du inte göra någonting mer än att få vara en del av alla härligheter på skolan, tack vare att du och dina vänner är medlemmar i Enskildas elevkår har vi i styrelsen möjligheten och pengarna till att t.ex. köpa in priser till våra olika tävlingar.
		<br/><br/>
		Tack för att DU är medlem!
		<br/><br/>
		
		Med vänliga hälsningar
		<br/><br/>
		Enskildkårens styrelse`);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enskidakåren</CardTitle>
        <CardDescription>Vad ska stå på enskilda kårens sida</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Label>Text</Label>
        <Textarea className="h-48" value={text} />
        <Separator />
        <Separator />
        <Label>Renderad</Label>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </CardContent>
      <CardFooter>
        <Button>Spara</Button>
      </CardFooter>
    </Card>
  );
}

export default EnskildaKaren;
