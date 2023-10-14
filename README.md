# Killer

Välkommen till den officiella platsen för Enskilda Killer.

## Att göra

- Filter Alla spelare admin
- Genomför mord
- Tvistemål admin
- Blogg admin
- Blogg först sidan
- Pausa spel
- Statistik
- Component för att välja cirkel, just nu input
- Spara spelar information
- Spara regler
- Spara begrepp
- Spara inställningar
- Toast info //TODO, status = 200
- Stäng Admin routes för icke admin
- Bulk flytta spelare

## Allmän information för dig som ska söka runt här

Jag använder dessa övergripande saker:

- React https://react.dev/
- NextJS https://nextjs.org/
- Tailwind https://tailwindcss.com/
- Shadcn UI https://ui.shadcn.com/
- Supabase https://supabase.com/
- Vercel https://vercel.com/

## Kod

Allt finns här, databas strukturen finns under:

```
src/intefaces/database.ts
```

Admin sidan finns under:

```
src/app/admin
src/app/functions/admin
```

## Supabase

https://supabase.com/dashboard/project/jgrgpovgjexatzgqimmg/editor

- Access Token: - - -
- Project Id: jgrgpovgjexatzgqimmg

### Commands

```
npx supabase login
```

```
npx supabase gen types typescript --project-id jgrgpovgjexatzgqimmg --schema public > src/interfaces/database.ts
```

## Github

https://github.com/Hawaii66/enskilda-killer

## Vercel

https://vercel.com/hawaiidev/enskilda-killer

## Live

- Just nu: https://enskildakiller.vercel.app/
- 2022: https://oldenskildakiller.vercel.app/
- Tidigare: <i>Länk saknas</i>
