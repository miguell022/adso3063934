import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Starting seed...')

    // -----------------------------
    // 1. Clean database
    // -----------------------------
    // IMPORTANTE: Los nombres deben coincidir con tu schema.prisma
    await prisma.games.deleteMany()   // Antes decía 'game' (error)
    await prisma.console.deleteMany() // Este estaba bien si el modelo es 'console'

    console.log('🧹 Database cleaned')

    // -----------------------------
    // 2. Create Consoles
    // -----------------------------
    await prisma.console.createMany({
        data: [
            {
                name: 'PlayStation 5',
                manufacturer: 'Sony Interactive Entertainment',
                releaseDate: new Date('2020-11-12'), // Corregido camelCase del schema
                description: 'The PlayStation 5 (PS5) is a home video game console bringing 4K gaming at 120Hz and ray tracing support.',
            },
            {
                name: 'Xbox Series X',
                manufacturer: 'Microsoft',
                releaseDate: new Date('2020-11-10'),
                description: 'The Xbox Series X is a high-performance console, featuring a custom AMD processor and 12 TFLOPS of graphical power.',
            },
            {
                name: 'Nintendo Switch OLED Model',
                manufacturer: 'Nintendo',
                releaseDate: new Date('2021-10-08'),
                description: 'A hybrid console that can be used as a home console and a portable handheld device, now with a vibrant OLED screen.',
            },
            {
                name: 'Nintendo Switch 2',
                manufacturer: 'Nintendo',
                releaseDate: new Date('2025-06-05'),
                description: 'The successor to the popular Nintendo Switch, featuring larger magnetic Joy-cons and enhanced performance.',
            },
            {
                name: 'Steam Deck OLED',
                manufacturer: 'Valve',
                releaseDate: new Date('2023-11-16'),
                description: 'A powerful handheld gaming computer that plays PC games from your Steam library on the go.',
            },
        ],
    })

    console.log('🎮 5 consoles seeded')

    // -----------------------------
    // 3. Get consoles from DB
    // -----------------------------
    const allConsoles = await prisma.console.findMany()

    const ps5 = allConsoles.find(c => c.name === 'PlayStation 5')
    const xbox = allConsoles.find(c => c.name === 'Xbox Series X')
    const switchOLED = allConsoles.find(c => c.name === 'Nintendo Switch OLED Model')
    const switch2 = allConsoles.find(c => c.name === 'Nintendo Switch 2')
    const steamDeck = allConsoles.find(c => c.name === 'Steam Deck OLED')

    // -----------------------------
    // 4. Create Games
    // -----------------------------
    const gamesData = [
        {
            title: 'God of War Ragnarök',
            developer: 'Santa Monica Studio',
            releaseDate: new Date('2022-11-09'), // Corregido a releaseDate (D mayúscula)
            price: 69.99,
            genre: 'Action-adventure',
            description: 'Kratos and Atreus must journey to each of the Nine Realms and find answers as the forces of Asgard prepare for a prophesied battle.',
            console_id: ps5?.id || 0,
        },
        {
            title: 'Halo Infinite',
            developer: '343 Industries',
            releaseDate: new Date('2021-12-08'),
            price: 59.99,
            genre: 'First-person shooter',
            description: 'Master Chief returns in the most expansive Halo campaign yet.',
            console_id: xbox?.id || 0,
        },
        {
            title: 'The Legend of Zelda: Tears of the Kingdom',
            developer: 'Nintendo EPD',
            releaseDate: new Date('2023-05-12'),
            price: 69.99,
            genre: 'Action-adventure',
            description: 'Link soars through the skies and explores new areas of Hyrule.',
            console_id: switchOLED?.id || 0,
        },
        {
            title: 'Elden Ring',
            developer: 'FromSoftware',
            releaseDate: new Date('2022-02-25'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'A fantasy action RPG adventure set within a world created by Hidetaka Miyazaki.',
            console_id: ps5?.id || 0,
        },
        {
            title: 'Forza Horizon 5',
            developer: 'Playground Games',
            releaseDate: new Date('2021-11-09'),
            price: 59.99,
            genre: 'Racing',
            description: 'Explore the vibrant open world landscapes of Mexico.',
            console_id: xbox?.id || 0,
        },
        {
            title: 'Pokémon Scarlet',
            developer: 'Game Freak',
            releaseDate: new Date('2022-11-18'),
            price: 59.99,
            genre: 'Role-playing',
            description: 'Embark on a new journey in the Paldea region.',
            console_id: switchOLED?.id || 0,
        },
        {
            title: 'Spider-Man 2',
            developer: 'Insomniac Games',
            releaseDate: new Date('2023-10-20'),
            price: 69.99,
            genre: 'Action-adventure',
            description: 'Peter Parker and Miles Morales face the Symbiote threat.',
            console_id: ps5?.id || 0,
        },
        {
            title: 'Starfield',
            developer: 'Bethesda Game Studios',
            releaseDate: new Date('2023-09-06'),
            price: 69.99,
            genre: 'Role-playing',
            description: 'Explore the vastness of space and create your own story.',
            console_id: xbox?.id || 0,
        },
        {
            title: 'Mario Kart 9',
            developer: 'Nintendo EPD',
            releaseDate: new Date('2025-12-01'),
            price: 59.99,
            genre: 'Racing',
            description: 'The next installment in the popular Mario Kart series.',
            console_id: switch2?.id || 0,
        },
        {
            title: 'Hogwarts Legacy',
            developer: 'Avalanche Software',
            releaseDate: new Date('2023-02-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'Experience a new story set in the wizarding world.',
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Spider-Man: Miles Morales",
            developer: "Insomniac Games",
            releaseDate: new Date("2020-11-12"),
            price: 49.99,
            genre: "Action-adventure",
            description: "Miles Morales discovers explosive powers to become his own Spider-Man.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Ratchet & Clank: Rift Apart",
            developer: "Insomniac Games",
            releaseDate: new Date("2021-06-11"),
            price: 69.99,
            genre: "Platformer",
            description: "Dimension-hopping adventure with Ratchet and Clank.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Returnal",
            developer: "Housemarque",
            releaseDate: new Date("2021-04-30"),
            price: 69.99,
            genre: "Roguelike",
            description: "Selene is trapped in a time loop on a hostile alien planet.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Horizon Forbidden West",
            developer: "Guerrilla Games",
            releaseDate: new Date("2022-02-18"),
            price: 69.99,
            genre: "Action RPG",
            description: "Aloy explores distant lands, fights bigger machines, and encounters new tribes.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Demon's Souls",
            developer: "Bluepoint Games",
            releaseDate: new Date("2020-11-12"),
            price: 69.99,
            genre: "Action RPG",
            description: "Remake of the PlayStation classic, challenging and beautiful.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Forza Motorsport",
            developer: "Turn 10 Studios",
            releaseDate: new Date("2023-10-10"),
            price: 69.99,
            genre: "Racing",
            description: "The most realistic racing simulation on Xbox.",
            console_id: xbox?.id || 0,
        },
        {
            title: "Starfield",
            developer: "Bethesda Game Studios",
            releaseDate: new Date("2023-09-06"),
            price: 69.99,
            genre: "RPG",
            description: "Epic space RPG from the creators of Skyrim and Fallout.",
            console_id: xbox?.id || 0,
        },
        {
            title: "Senua's Saga: Hellblade II",
            developer: "Ninja Theory",
            releaseDate: new Date("2024-05-21"),
            price: 59.99,
            genre: "Action-adventure",
            description: "The sequel to the award-winning Hellblade: Senua's Sacrifice.",
            console_id: xbox?.id || 0,
        },
        {
            title: "Fable",
            developer: "Playground Games",
            releaseDate: new Date("2025-11-01"),
            price: 69.99,
            genre: "RPG",
            description: "A new beginning for the legendary franchise.",
            console_id: xbox?.id || 0,
        },
        {
            title: "The Legend of Zelda: Breath of the Wild",
            developer: "Nintendo EPD",
            releaseDate: new Date("2017-03-03"),
            price: 59.99,
            genre: "Action-adventure",
            description: "Open-world Zelda adventure that redefined the series.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Super Mario Odyssey",
            developer: "Nintendo EPD",
            releaseDate: new Date("2017-10-27"),
            price: 59.99,
            genre: "Platformer",
            description: "Mario embarks on a globe-trotting adventure.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Metroid Dread",
            developer: "MercurySteam",
            releaseDate: new Date("2021-10-08"),
            price: 59.99,
            genre: "Action-adventure",
            description: "Samus Aran returns in a new 2D Metroid adventure.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Splatoon 3",
            developer: "Nintendo EPD",
            releaseDate: new Date("2022-09-09"),
            price: 59.99,
            genre: "Shooter",
            description: "Ink-splatting action returns with new weapons and maps.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Animal Crossing: New Horizons",
            developer: "Nintendo EPD",
            releaseDate: new Date("2020-03-20"),
            price: 59.99,
            genre: "Simulation",
            description: "Create your island paradise and share it with friends.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "SteamWorld Build",
            developer: "The Station",
            releaseDate: new Date("2023-12-01"),
            price: 29.99,
            genre: "Strategy",
            description: "Build and manage a mining town above and below ground.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Hades",
            developer: "Supergiant Games",
            releaseDate: new Date("2021-08-13"),
            price: 24.99,
            genre: "Roguelike",
            description: "Battle out of hell in this award-winning indie hit.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Cyberpunk 2077",
            developer: "CD Projekt Red",
            releaseDate: new Date("2020-12-10"),
            price: 59.99,
            genre: "RPG",
            description: "Futuristic open-world RPG in Night City.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Baldur's Gate 3",
            developer: "Larian Studios",
            releaseDate: new Date("2023-08-03"),
            price: 59.99,
            genre: "RPG",
            description: "Epic D&D adventure with deep story and tactical combat.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Stardew Valley",
            developer: "ConcernedApe",
            releaseDate: new Date("2016-02-26"),
            price: 14.99,
            genre: "Simulation",
            description: "Farm, fish, and build relationships in this indie classic.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Persona 5 Royal",
            developer: "Atlus",
            releaseDate: new Date("2022-10-21"),
            price: 59.99,
            genre: "JRPG",
            description: "Join the Phantom Thieves in this expanded RPG adventure.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Pokémon Scarlet",
            developer: "Game Freak",
            releaseDate: new Date("2022-11-18"),
            price: 59.99,
            genre: "RPG",
            description: "Embark on a new journey in the Paldea region.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Spider-Man 2",
            developer: "Insomniac Games",
            releaseDate: new Date("2023-10-20"),
            price: 69.99,
            genre: "Action-adventure",
            description: "Peter Parker and Miles Morales face the Symbiote threat.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Starfield",
            developer: "Bethesda Game Studios",
            releaseDate: new Date("2023-09-06"),
            price: 69.99,
            genre: "RPG",
            description: "Explore the vastness of space and create your own story.",
            console_id: xbox?.id || 0,
        },
        {
            title: "Mario Kart 9",
            developer: "Nintendo EPD",
            releaseDate: new Date("2025-12-01"),
            price: 59.99,
            genre: "Racing",
            description: "The next installment in the popular Mario Kart series.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Hogwarts Legacy",
            developer: "Avalanche Software",
            releaseDate: new Date("2023-02-10"),
            price: 69.99,
            genre: "Action RPG",
            description: "Vive tu propia aventura mágica en el mundo de Harry Potter.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Spider-Man: Miles Morales",
            developer: "Insomniac Games",
            releaseDate: new Date("2020-11-12"),
            price: 49.99,
            genre: "Action-adventure",
            description: "Miles Morales descubre poderes explosivos para convertirse en su propio Spider-Man.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Ratchet & Clank: Rift Apart",
            developer: "Insomniac Games",
            releaseDate: new Date("2021-06-11"),
            price: 69.99,
            genre: "Platformer",
            description: "Aventura interdimensional con Ratchet y Clank.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Returnal",
            developer: "Housemarque",
            releaseDate: new Date("2021-04-30"),
            price: 69.99,
            genre: "Roguelike",
            description: "Selene está atrapada en un bucle temporal en un planeta alienígena hostil.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Horizon Forbidden West",
            developer: "Guerrilla Games",
            releaseDate: new Date("2022-02-18"),
            price: 69.99,
            genre: "Action RPG",
            description: "Aloy explora tierras lejanas y enfrenta nuevas tribus y máquinas.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Demon's Souls",
            developer: "Bluepoint Games",
            releaseDate: new Date("2020-11-12"),
            price: 69.99,
            genre: "Action RPG",
            description: "Remake del clásico desafiante de PlayStation.",
            console_id: ps5?.id || 0,
        },
        {
            title: "Forza Motorsport",
            developer: "Turn 10 Studios",
            releaseDate: new Date("2023-10-10"),
            price: 69.99,
            genre: "Racing",
            description: "La simulación de carreras más realista en Xbox.",
            console_id: xbox?.id || 0,
        },
        {
            title: "The Legend of Zelda: Breath of the Wild",
            developer: "Nintendo EPD",
            releaseDate: new Date("2017-03-03"),
            price: 59.99,
            genre: "Action-adventure",
            description: "La aventura de mundo abierto que redefinió la saga Zelda.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Super Mario Odyssey",
            developer: "Nintendo EPD",
            releaseDate: new Date("2017-10-27"),
            price: 59.99,
            genre: "Platformer",
            description: "Mario viaja por el mundo en una aventura inolvidable.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Metroid Dread",
            developer: "MercurySteam",
            releaseDate: new Date("2021-10-08"),
            price: 59.99,
            genre: "Action-adventure",
            description: "Samus Aran regresa en una nueva aventura 2D.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Splatoon 3",
            developer: "Nintendo EPD",
            releaseDate: new Date("2022-09-09"),
            price: 59.99,
            genre: "Shooter",
            description: "La acción de pintura regresa con nuevas armas y mapas.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "Animal Crossing: New Horizons",
            developer: "Nintendo EPD",
            releaseDate: new Date("2020-03-20"),
            price: 59.99,
            genre: "Simulation",
            description: "Crea tu paraíso isleño y compártelo con amigos.",
            console_id: switchOLED?.id || 0,
        },
        {
            title: "SteamWorld Build",
            developer: "The Station",
            releaseDate: new Date("2023-12-01"),
            price: 29.99,
            genre: "Strategy",
            description: "Construye y gestiona una ciudad minera sobre y bajo tierra.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Hades",
            developer: "Supergiant Games",
            releaseDate: new Date("2021-08-13"),
            price: 24.99,
            genre: "Roguelike",
            description: "Escapa del inframundo en este galardonado indie.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Cyberpunk 2077",
            developer: "CD Projekt Red",
            releaseDate: new Date("2020-12-10"),
            price: 59.99,
            genre: "RPG",
            description: "RPG futurista de mundo abierto en Night City.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Baldur's Gate 3",
            developer: "Larian Studios",
            releaseDate: new Date("2023-08-03"),
            price: 59.99,
            genre: "RPG",
            description: "Aventura épica de D&D con historia profunda y combate táctico.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Stardew Valley",
            developer: "ConcernedApe",
            releaseDate: new Date("2016-02-26"),
            price: 14.99,
            genre: "Simulation",
            description: "Cultiva, pesca y haz amigos en este clásico indie.",
            console_id: steamDeck?.id || 0,
        },
        {
            title: "Persona 5 Royal",
            developer: "Atlus",
            releaseDate: new Date("2022-10-21"),
            price: 59.99,
            genre: "JRPG",
            description: "Únete a los Ladrones Fantasma en esta aventura RPG expandida.",
            console_id: ps5?.id || 0,
        },
    ]

    for (const game of gamesData) {
        if (!game.console_id) continue

        // Usamos prisma.Games porque así lo llamaste en el schema
        await prisma.games.create({
            data: game,
        })
    }

    console.log('🕹️ 10 games seeded')
    console.log('✅ Seed completed successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })