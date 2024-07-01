<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\Category;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creazione delle categorie
        $adventureCategory = Category::firstOrCreate(['name' => 'Avventura']);
        $actionCategory = Category::firstOrCreate(['name' => 'Azione']);
        $rpgCategory = Category::firstOrCreate(['name' => 'RPG']);
        $mmorpgCategory = Category::firstOrCreate(['name' => 'MMORPG']);
        $shooterCategory = Category::firstOrCreate(['name' => 'Sparatutto']);
        $fightingCategory = Category::firstOrCreate(['name' => 'Picchiaduro']);
        $survivalCategory = Category::firstOrCreate(['name' => 'Sopravvivenza']);
        $puzzleCategory = Category::firstOrCreate(['name' => 'Rompicapo']);
        $horrorCategory = Category::firstOrCreate(['name' => 'Horror']);
        $racingCategory = Category::firstOrCreate(['name' => 'Corse']);

        // Creazione del gioco
        $game1 = Game::create([
            'title' => 'Ghost of Tsushima',
            'description' => "La trama del gioco è un'epopea giapponese del 13° secolo, con uno scenario bellissimo e dettagliato che include animali tra i quali uccelli canori, compresi quelli dorati che ti guidano in modo non così sottile quando ti perdi o ti distrai, grilli e anche volpi che puoi accarezzare, e templi shintoisti.

Sei il signore dei samurai Jin Sakai e hai il compito di respingere gli invasori mongoli finora riusciti (sotto Khotun Khan, che è il nipote dell'acclamato Gengis) per reclamare la tua terra e vendicare l'insulto alla tua casa che è stata invasa e data in consegna.

Tuttavia, per avere successo, devi prendere alcune decisioni difficili: preferisci aderire ai rigidi protocolli onorevoli dei samurai o fare la cosa 'giusta' moralmente? Mentre ti trasformi da Jin, il samurai in piedi, in 'The Ghost', raccoglierai un gruppo eterogeneo di alleati, mentre viaggi, scoprirai le loro storie passate e li aiuterai a risolvere i loro problemi.

I tuoi alleati includono Sensei Ishikawa, il famoso samurai arciere alla ricerca del suo studente scomparso; Masako, una madre addolorata in cerca di vendetta su coloro che hanno ucciso la sua famiglia e Yuna, la ladra che ti ha salvato la vita all'inizio della storia, che farà di tutto per salvare suo fratello dai Mongoli.",
            'price' => 59.99,
            'release_date' => '2024-05-16',
            'developer' => 'Sucker Punch Productions, Nixxes Software',
            'publisher' => 'PlayStation PC LLC',
            'game_img' => 'http://localhost:8000/storage/game_images/tsushimaCover.jpg',
            'game_img_large' => 'http://localhost:8000/storage/game_images/tsushimaLarge.jpg',
            'video' => 'https://www.youtube.com/embed/RcWk08PBe7k?si=ziGPvU5U0VwnmMr2',
        ], 
    );

        // Associa categorie al gioco
        $game1->categories()->attach($adventureCategory->id);
        $game2 = Game::create([
            'title' => 'The Witcher 3: Wild Hunt',
            'description' => "Vesti i panni di Geralt di Rivia, cacciatore di mostri, in una terra devastata dalla guerra e infestata da terribili creature. Il tuo contratto? Rintracciare Ciri, la Figlia della Profezia, un'arma vivente che può alterare il destino del mondo.
        
        Aggiornato alla versione più recente, The Witcher 3: Wild Hunt contiene tutti i contenuti scaricabili pubblicati, insieme a tutte le nuove aggiunte, tra cui la modalità foto incorporata, oggetti ispirati alla serie Netflix di The Witcher come spade, armature e abiti alternativi, e altro ancora! Ammira il mondo dark fantasy del Continente come mai prima d'ora! Questa edizione di The Witcher 3: Wild Hunt è stata arricchita con numerosi miglioramenti grafici e tecnici, tra cui un livello di dettaglio notevolmente migliorato, una gamma di mod recenti create dalla community, ray tracing in tempo reale e altro, il tutto implementato per sfruttare appieno la potenza dei nuovi PC.",
            'price' => 29.99,
            'release_date' => '2015-05-18',
            'developer' => 'CD Projekt Red',
            'publisher' => 'CD Projekt',
            'game_img' => 'http://localhost:8000/storage/game_images/witcher3Larger.jpg',
            'game_img_large' => 'http://localhost:8000/storage/game_images/witcher3Large.jpg',
            'video' => 'https://www.youtube.com/embed/1-l29HlKkXU',
        ]);
        
        // Associa categorie al gioco
        $game2->categories()->attach([ $adventureCategory->id]);



        // Creazione del gioco Cyberpunk 2077
$game3 = Game::create([
    'title' => 'Cyberpunk 2077',
    'description' => "Sette anni dopo, Cyberpunk 2077 sembra essere all'altezza di tutto l'hype generato dalla sua presentazione all'E3 nel 2019.

    Ambientato cinquantasette anni dopo rispetto al gioco da tavolo su cui è basato, Cyberpunk 2020, ha una grafica eccellente e i personaggi, gli scenari, le azioni e i movimenti sono così realistici che potrebbero essere scambiati per filmati.

    Giocando seguendo la narrazione, è possibile scegliere di non uccidere altri personaggi, usando armi non letali e strategie che ti tengono lontano da seri scontri che tendono a diventare letali.

    Il gioco contiene nudità complete, poiché i giocatori possono aggiornare i loro corpi con modifiche che conferiscono loro poteri e ulteriori capacità e in queste occasioni devono spogliarsi per dotarsi di nuovi arti e altri accessori.",
    'price' => 49.99,
    'release_date' => '2020-12-10',
    'developer' => 'CD Projekt Red',
    'publisher' => 'CD Projekt',
    'game_img' => 'http://localhost:8000/storage/game_images/cyberpunkCover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/cyberpunkLarge.jpg',
    'video' => 'https://www.youtube.com/embed/8X2kIfS6fb8',
]);

// Associa categorie al gioco Cyberpunk 2077
$game3->categories()->attach([$rpgCategory->id]);


// Creazione del gioco Dark Souls III
$game4 = Game::create([
    'title' => 'Dark Souls III',
    'description' => "Il giocatore assume la parte del personaggio Ashen One, che ha il compito di 'collegare' la First Flame per mantenerla accesa. La fiamma è alimentata dai sacrifici di eroi e campioni, che sacrificano volontariamente le loro anime alla fiamma, diventando così Lords of Cinder. La luce della fiamma non si è mai interrotta nel tempo fino ad ora. L'Ashen One non è riuscito a collegare la fiamma e non è diventato un Lord of Cinder e viene chiamato Unkindled.

    L'Ashen One sorge quando il giocatore entra in gioco e gli viene data la missione di riportare il Principe Lothric e i ribelli Lord of Cinders nei loro luoghi legittimi, i loro troni nel Santuario di Firelink. La fiamma sta morendo perché il principe Lothric ha sfidato il suo destino: bisogna convincerlo a fare il contrario.

    Ritornando vittoriosi i Lord of Cinder e The Prisoner, viaggiano sulle rovine della Kiln of the First Flame: a questo punto, dopo la sconfitta della Soul of Cinder, ci sono quattro potenziali finali. Se vuoi saperne di più leggi qui sotto.",
    'price' => 39.99,
    'release_date' => '2016-04-12',
    'developer' => 'FromSoftware',
    'publisher' => 'Bandai Namco Entertainment',
    'game_img' => 'http://localhost:8000/storage/game_images/darksouls3Cover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/darksouls3Large.jpg',
    'video' => 'https://www.youtube.com/embed/-6sd-AGJoA4',
]);

// Associa categorie al gioco Dark Souls III
$game4->categories()->attach([ $actionCategory->id]);


// Creazione del gioco DOOM Eternal
$game5 = Game::create([
    'title' => 'DOOM Eternal',
    'description' => "Le armate infernali hanno invaso la Terra. Diventa lo Slayer in un’epica campagna per giocatore singolo, conquista demoni attraverso le dimensioni e ferma la distruzione finale dell’umanità.Vivi l’ultima combinazione di velocità e potenza in DOOM Eternal, un passo avanti nel combattimento aggressivo in prima persona.Una nuova esperienza multigiocatore 2 contro 1 ideata da id Software. Uno Slayer armato fino ai denti affronta due demoni controllati da giocatori in intensi combattimenti in prima persona al meglio dei cinque round.",
    'price' => 59.99,
    'release_date' => '2020-03-20',
    'developer' => 'id Software',
    'publisher' => 'Bethesda Softworks',
    'game_img' => 'http://localhost:8000/storage/game_images/doometernalCover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/doometernalLarge.jpg',
    'video' => 'https://www.youtube.com/embed/FkklG9MA0vM',
]);

// Associa categorie al gioco DOOM Eternal
$game5->categories()->attach([$horrorCategory->id]);

// Creazione del gioco Hades
$game6 = Game::create([
    'title' => 'Hades',
    'description' => "Hades per PC è un gioco roguelike - o forse il termine migliore è 'roguelite' perché in questo gioco sei destinato a morire ancora e ancora, tornando all'inizio un po' più vecchio, più saggio e con molti miglioramenti e potenziamenti. Ha anche molti elementi di un gioco di ruolo e vanta una vista isometrica e una fantastica colonna sonora che migliora l'esperienza di gioco, in particolare durante le scene di combattimento.Inizi giocando ogni volta nelle stesse quattro stanze, ma la disposizione dei nemici al suo interno sono ogni volta differenti, offrendoti molta varietà per tenerti impegnato. Muori molto, soprattutto all'inizio, ma qualunque bottino, tesoro, power-up e abilità che hai migliorato rimane con te - da qui il gioco chiamato 'roguelite' piuttosto che roguelike, che enfatizza la morte permanente e la perdita di tutte le ricompense.",
    'price' => 24.99,
    'release_date' => '2020-09-17',
    'developer' => 'Supergiant Games',
    'publisher' => 'Supergiant Games',
    'game_img' => 'http://localhost:8000/storage/game_images/hadesCover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/hadesLarge.jpg',
    'video' => 'https://www.youtube.com/embed/OBE9vMUGX6E',
]);

// Associa categorie al gioco Hades
$game6->categories()->attach([ $actionCategory->id]);


// Creazione del gioco Resident Evil Village
$game7 = Game::create([
    'title' => 'Resident Evil Village',
    'description' => "Vivi un'esperienza survival horror senza precedenti nell'ottavo capitolo della serie principale di Resident Evil: Resident Evil Village.

    Ambientata alcuni anni dopo gli eventi del pluripremiato Resident Evil 7: Biohazard, la nuova vicenda ha inizio con Ethan Winters e la moglie Mia che hanno ritrovato la tranquillità in una nuova casa, dimenticando gli orrori del passato. Ma proprio mentre cercano di ricostruire la loro vita insieme, la tragedia li investe nuovamente.",
    'price' => 59.99,
    'release_date' => '2021-05-07',
    'developer' => 'Capcom',
    'publisher' => 'Capcom',
    'game_img' => 'http://localhost:8000/storage/game_images/revillageCover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/revillageLarge.jpg',
    'video' => 'https://www.youtube.com/embed/1_Ev5UJTjPA',
]);

// Associa categorie al gioco Resident Evil Village
$game7->categories()->attach([$survivalCategory->id]);


// Creazione del gioco Forza Horizon 4
$game8 = Game::create([
    'title' => 'Forza Horizon 4',
    'description' => "La rappresentazione del Regno Unito in primo piano comprende Edimburgo; il Lake District, in particolare Derwentwater; e i Cotswolds, oltre ad altri luoghi britannici belli e famosi. Il gioco si svolge in contesti prevalentemente rurali, vale a dire foreste, campi coltivati e piccoli villaggi, dando alle tue esplorazioni un'atmosfera delicata e intima.

    I giocatori possono scegliere tra un massimo di 450 macchine diverse e possono giocare in gruppi fino a 72 giocatori per server, il tutto in un mondo sincronizzato e condiviso. Ogni veicolo è stato progettato individualmente in modo da 'sembrare' diverso dagli altri - potresti ridurre la difficoltà di una sezione o gara particolare, o potresti divertirti a cambiare veicolo fino a quando non avrai trovato l'auto ideale per quella specifica gara!

    Ci sono molte missioni secondarie, parallelamente alla storia principale, che ti terranno occupato e ti sapranno divertire, ognuna con la propria barra di avanzamento in modo da poter vedere quanto sei vicino al completamento.",
    'price' => 49.99,
    'release_date' => '2018-10-02',
    'developer' => 'Playground Games',
    'publisher' => 'Microsoft Studios',
    'game_img' => 'http://localhost:8000/storage/game_images/forzahorizon4Cover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/forzahorizon4Large.jpg',
    'video' => 'https://www.youtube.com/embed/7brXZmFA8u8',
]);

// Associa categorie al gioco Forza Horizon 4
$game8->categories()->attach([$racingCategory->id]);


// Creazione del gioco The Legend of Zelda: Breath of the Wild
$game9 = Game::create([
    'title' => 'The Legend of Zelda: Breath of the Wild',
    'description' => "Puoi rendere ancora più indimenticabili le tue avventure a Hyrule con il pass di espansione per The Legend of Zelda: Breath of the Wild. Il pass di espansione dà accesso a due pacchetti di DLC e a tre nuovi scrigni.

    Se acquisti il pass di espansione, tre nuovi scrigni appaiono nell’altopiano delle origini. Dentro uno di questi scrigni, Link troverà una maglietta con un emblema familiare: il logo di Nintendo Switch! Gli altri due scrigni contengono oggetti utili.

    Include la sfida prova della spada, la modalità master, la funzione il Cammino dell'eroe, l'amuleto del teletrasporto e una nuova armatura.

    Include La ballata dei campioni, nove oggetti nascosti e la bardatura ancestrale.",
    'price' => 59.99,
    'release_date' => '2017-03-03',
    'developer' => 'Nintendo',
    'publisher' => 'Nintendo',
    'game_img' => 'http://localhost:8000/storage/game_images/zeldaCover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/zeldaLarge.jpg',
    'video' => 'https://www.youtube.com/embed/1rPxiXXxftE',
]);

// Associa categorie al gioco The Legend of Zelda: Breath of the Wild
$game9->categories()->attach([$rpgCategory->id]);

// Creazione del gioco Sekiro: Shadows Die Twice
$game10 = Game::create([
    'title' => 'Sekiro: Shadows Die Twice',
    'description' => "Intraprendi il cammino verso la vendetta nell'acclamata avventura di FromSoftware, gli sviluppatori di Bloodborne e della serie Dark Souls.

    In Sekiro: Shadows Die Twice vestirai i panni di un 'lupo senza un braccio', un guerriero sfregiato e caduto in disgrazia, salvato a un passo dalla morte. Il tuo destino è legato a un giovane di nobili origini, discendente di un'antica stirpe: per proteggerlo affronterai numerosi nemici, tra cui lo spietato clan Ashina. Niente ti fermerà nella pericolosa missione per riscattare il tuo onore e liberare il giovane signore, nemmeno la morte stessa.

    Esplora il Giappone alla fine del 1500, in pieno periodo Sengoku: un'era violenta percorsa da conflitti brutali e in bilico tra la vita e la morte. Affronta straordinari nemici in un mondo oscuro e perverso. Scatena protesi letali e potenti abilità ninja unendo azione furtiva, movimento verticale e combattimenti viscerali in un'avventura sanguinolenta.

    Vendicati. Riscatta il tuo onore. Uccidi con astuzia.",
    'price' => 59.99,
    'release_date' => '2019-03-22',
    'developer' => 'FromSoftware',
    'publisher' => 'Activision',
    'game_img' => 'http://localhost:8000/storage/game_images/sekiroCover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/sekiroLarge.jpg',
    'video' => 'https://www.youtube.com/embed/rXMX4YJ7Lks',
]);

// Associa categorie al gioco Sekiro: Shadows Die Twice
$game10->categories()->attach([ $actionCategory->id]);


// Creazione del gioco Mortal Kombat 11
$game11 = Game::create([
    'title' => 'Mortal Kombat 11',
    'description' => "Vivi l'esperienza di MK11 definitiva! Vesti i panni dei protettori della Terra in DUE storie avvincenti che sovvertono le leggi spazio-temporali e affronta una lotta contro il tempo per impedire a Kronika di riavviare la storia. Contiene l'elenco kompleto dei 37 kombattenti, inclusi gli ultimi arrivati: Rain, Mileena e Rambo.",
    'price' => 49.99,
    'release_date' => '2019-04-23',
    'developer' => 'NetherRealm Studios',
    'publisher' => 'Warner Bros. Interactive Entertainment',
    'game_img' => 'http://localhost:8000/storage/game_images/mk11Cover.jpg',
    'game_img_large' => 'http://localhost:8000/storage/game_images/mk11Large.jpg',
    'video' => 'https://www.youtube.com/embed/UoTams2yc0E',
]);

// Associa categorie al gioco Mortal Kombat 11
$game11->categories()->attach([$fightingCategory->id]);


    }
}
