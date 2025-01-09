export default function Home()
{
    return (
        <div>
        <header className="py-16 relative">
            <div className="container mx-auto text-center px-4 sm:px-0 flex flex-col items-center">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 animate-fadeIn text-highlight">
                Benvenuti su Fie-co
                </h1>
                <p className="text-lg mb-8 max-w-lg text-subtitle">
                La piattaforma perfetta per supportare gli agricoltori con strumenti avanzati.
                </p>
                <button
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-all"
                >
                Inizia Ora
                </button>
            </div>
            </header>
            <section className="py-16 bg-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
                <div id="wiki" className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <img src="wiki.jpg" alt="Wiki" className="mx-auto mb-6 rounded-full"/>
                <h3 className="text-2xl font-bold text-green-700 mb-3">Wiki Informativa</h3>
                <p className="text-gray-600">Articoli dettagliati sulle migliori pratiche agricole.</p>
                </div>
                <div id="qa" className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <img src="q&a.jpg" alt="Q&A" className="mx-auto mb-6 rounded-full"/>
                <h3 className="text-2xl font-bold text-green-700 mb-3">Q&A</h3>
                <p className="text-gray-600">Risolvi dubbi con il supporto di esperti agricoli.</p>
                </div>
                <div id="iot" className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <img src="iot.jpg" alt="Monitoraggio Dati" className="mx-auto mb-6 rounded-full"/>
                <h3 className="text-2xl font-bold text-green-700 mb-3">Monitoraggio Dati</h3>
                <p className="text-gray-600">Monitora i campi con dati in tempo reale.</p>
                </div>
            </div>
            </section>

            <section className="py-16 bg-green-50">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                <video autoplay muted loop className="rounded-lg shadow-lg w-full">
                    <source src="video.mp4" type="video/mp4" />
                    Il tuo browser non supporta il video.
                </video>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-green-700 mb-4">Chi siamo</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Fie-co è la piattaforma che unisce tecnologia e agricoltura, offrendo strumenti avanzati per ottimizzare il lavoro agricolo e migliorare le coltivazioni.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mt-4">
                    La nostra missione è supportare agricoltori e professionisti con soluzioni innovative, dalla gestione dei campi al monitoraggio IoT, fino alla condivisione di conoscenze.
                </p>
                <button
                    className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-all"
                >
                    Scopri di più
                </button>
                </div>
            </div>
            </section>

            <section className="py-16 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-green-700 mb-8">Cosa dicono di noi</h2>
                <div id="testimonial-carousel" className="relative overflow-hidden">
                <div className="carousel-track flex transition-transform duration-700 ease-in-out">
                    <div className="testimonial-slide p-6 bg-gray-50 rounded-lg shadow-lg flex-shrink-0 w-full md:w-1/3 mx-auto">
                    <img
                        src="user1.jpg"
                        alt="Giuseppe Marvulli"
                        className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-600"
                    />
                    <p className="text-gray-700 italic">
                        "Fie-co ha rivoluzionato il mio lavoro agricolo. Gli strumenti sono facili da usare e davvero utili!"
                    </p>
                    <h4 className="text-green-700 font-bold mt-4">Giuseppe Marvulli</h4>
                    <p className="text-sm text-gray-500">Agricoltore</p>
                    </div>
                    <div className="testimonial-slide p-6 bg-gray-50 rounded-lg shadow-lg flex-shrink-0 w-full md:w-1/3 mx-auto">
                    <img
                        src="user2.jpg"
                        alt="Bianca Rossi"
                        className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-600"
                    />
                    <p className="text-gray-700 italic">
                        "Grazie a Fie-co ho trovato risposte utilissime per migliorare la qualità del mio raccolto."
                    </p>
                    <h4 className="text-green-700 font-bold mt-4">Bianca Rossi</h4>
                    <p className="text-sm text-gray-500">Agronoma</p>
                    </div>
                    <div className="testimonial-slide p-6 bg-gray-50 rounded-lg shadow-lg flex-shrink-0 w-full md:w-1/3 mx-auto">
                    <img
                        src="user3.jpg"
                        alt="Marco Fabrizi"
                        className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-green-600"
                    />
                    <p className="text-gray-700 italic">
                        "Con Fie-co posso monitorare i miei campi in tempo reale. Non potrei più farne a meno!"
                    </p>
                    <h4 className="text-green-700 font-bold mt-4">Marco Fabrizi</h4>
                    <p className="text-sm text-gray-500">Esperto Agricolo</p>
                    </div>
                </div>
                <button id="prev" className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-700">
                    &lt;
                </button>
                <button id="next" className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-700">
                    &gt;
                </button>
                </div>
            </div>
            </section>
            <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-green-700 mb-12">Il nostro impatto</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
                    <div className="text-green-600 text-6xl mb-4">
                    <i className="fas fa-users"></i>
                    </div>
                    <div className="text-5xl font-bold text-green-600">10k+</div>
                    <p className="text-gray-600 mt-2">Utenti Registrati</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
                    <div className="text-green-600 text-6xl mb-4">
                    <i className="fas fa-question-circle"></i>
                    </div>
                    <div className="text-5xl font-bold text-green-600">5k+</div>
                    <p className="text-gray-600 mt-2">Domande Risolte</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
                    <div className="text-green-600 text-6xl mb-4">
                    <i className="fas fa-book"></i>
                    </div>
                    <div className="text-5xl font-bold text-green-600">500+</div>
                    <p className="text-gray-600 mt-2">Articoli Pubblicati</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
                    <div className="text-green-600 text-6xl mb-4">
                    <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="text-5xl font-bold text-green-600">1M+</div>
                    <p className="text-gray-600 mt-2">Dati Monitorati</p>
                </div>
                </div>
            </div>
            </section>
            </div>
    )
}