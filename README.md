### Jennifer Jakobsson


# Backend-baserad webbutveckling
### Moment 3.2 - Uppgift 1, DT207G

<br>
<br>

# NoSQL-databaser

>### Laboration i Moment 3.2 - Uppgift 1:
>Denna uppgift är den andra delen av Moment 3 - NoSQL-databaser. Detta är en REST-webbtjänst byggt med Express och Moongose schema som hanterar arbetserfarenheter. Tjänsten innehar akronymen CRUD (Create Read Update Delete) för att hantera data och låter resurser begäras från annan ursprung. 
>
>APIet använder en MongoCB-databas och kan användas genom att köra kommando npm install för installation av nödvändiga npm-paket. Vidare behöver man köra installationsskriptet för att skapa databastabellerna nedan. En liveversion av webbtjänsten finns tillgänglig här: [Länk till API](https://jeja2306-dt207g-moment3-2-1.onrender.com/workexperiences)

<br>

### Användning av databas:

<br>

| Metod | Ändpunkt | Beskrivning |
|-----------------|-----------------|-----------------|
| GET | /cv | Hämtar databasen datan är lagrad i |
| GET | /workexperiences | Hämtar tillgängliga arbetslivserfarenheter |
| GET | /workexperiences/:id | Hämtar specifik arbetslivserfarenhet |
| POST | /workexperiences | Lagrar en ny arbetslivserfarenhet |
| PUT | /workexperiences/:id | Uppdaterar en specifik arbetslivserfarenhet |
| DELETE | /workexperiences/:id | Raderar en specifik arbetslivserfarenhet |

<br>

#### Ett kurs-objekt returneras/skickas som JSON med följande struktur:

<br>

```json
{
    "_id": "66298100c0cfa4410c5346d1",
    "companyname": "Frilansare",
    "jobtitle": "Grafiker",
    "location": "Sundsvall",
    "description": "Skapar logotyper och grafiskt innehåll",
    "__v": 0
}
```

<br>

### Struktur av schema

- **companyname**
  - Type: String
  - Required: Yes
  - Error Message: "Du måste ange arbetsgivare"
  - Trimmed: Yes

- **jobtitle**
  - Type: String
  - Required: Yes
  - Error Message: "Du måste ange en arbetsroll"
  - Trimmed: Yes

- **location**
  - Type: String
  - Required: Yes
  - Error Message: "Du måste ange vart du arbetade"
  - Trimmed: Yes

- **description**
  - Type: String
  - Required: Yes
  - Error Message: "Du måste ange en beskrivning av ditt arbete"
  - Trimmed: Yes
  - Minimum Length: 10 characters
  - Error Message: "Beskrivningen måste vara minst 10 tecken lång"