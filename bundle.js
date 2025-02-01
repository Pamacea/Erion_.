document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM complètement chargé.");
});
let debounceTimeout;
const updateIconVisibility = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        // Ton code de mise à jour
    }, 100); // 100 ms de délai
};
// Bloque les touches F12, Ctrl+Shift+I et Ctrl+U
document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && (e.key === "u" || e.key === "U")) || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
    }
});
//
// DRAG MOVE ZOOM FUNCTIONS
document.addEventListener("DOMContentLoaded", () => {
    let scale = 1.5,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },
        zoom = document.getElementById("zoom"),
        container = document.getElementById("interactive_map"),
        terrain = document.getElementById("terrain"),
        minScale = 1,
        maxScale = 5;

    function setTransform() {
        zoom.style.transition = 'transform 0.1s ease';
        zoom.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    }

    function centerImage() {
        const containerRect = container.getBoundingClientRect();
        const terrainRect = terrain.getBoundingClientRect();
        pointX = (containerRect.width - terrainRect.width * scale) / 2;
        pointY = (containerRect.height - terrainRect.height * scale) / 2;
        setTransform();
    }

    function constrainMovement() {
        const containerRect = container.getBoundingClientRect();
        const zoomRect = zoom.getBoundingClientRect();
        pointX = Math.min(Math.max(containerRect.width - zoomRect.width, pointX), 0);
        pointY = Math.min(Math.max(containerRect.height - zoomRect.height, pointY), 0);
    }

    zoom.addEventListener("mousedown", (e) => {
        e.preventDefault();
        start = { x: e.clientX - pointX, y: e.clientY - pointY };
        panning = true;
    });

    document.addEventListener("mouseup", () => panning = false);

    zoom.addEventListener("mousemove", (e) => {
        if (!panning) return;
        e.preventDefault();
        pointX = e.clientX - start.x;
        pointY = e.clientY - start.y;
        constrainMovement();
        setTransform();
    });

    zoom.addEventListener("wheel", (e) => {
        e.preventDefault();
        const xs = (e.clientX - pointX) / scale;
        const ys = (e.clientY - pointY) / scale;
        const delta = e.deltaY > 0 ? 0.8 : 1.2;
        scale = Math.min(Math.max(scale * delta, minScale), maxScale);
        pointX = e.clientX - xs * scale;
        pointY = e.clientY - ys * scale;
        constrainMovement();
        setTransform();
    });

    centerImage(); // Initial call to center the image
});
//
// ICONS CLICKABLE --> PANELS & GALLERY FUNCTIONS -> CONTENTMAP
document.addEventListener("DOMContentLoaded", () => {
    const sidePanel = document.getElementById("side_panel");
    const panelContent = document.getElementById("panel_content");
    const closePanel = document.getElementById("close_panel");
    const galleryPanel = document.getElementById("gallery_panel");
    const galleryContent = document.getElementById("gallery_content");
    const closeGalleryPanel = document.getElementById("closegallery_panel");
    const contentMap = {
        // CAPITALES //
        "havilah": ` 
            <article>
                <h2 id="title_panel">HAVILAH</h2>
                <p id="subtitle_panel">EMPIRE EXPENSIONISTE <br>ET DESTRUCTEUR</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La capitale et maison de la dynastie Uriah depuis plus d’un millier d’année, et le siège de l’Alliance depuis des centaines. Au fond des collines, des montagnes, parsemés de quelques rivières, elle est le centre politique de l’Alliance, et recueille une immense majorité de l’aristocratie de la caste.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                
                <div class="module_border">
                    <button id="palaishavilah" class="open-gallery gallery_button" data-gallery="palaishavilah-gallery"><p>LE PALAIS D'HAVILAH</p></button>
                </div>
                <div class="module_border">
                    <button id="danslajungle" class="open-gallery gallery_button" data-gallery="danslajungle-gallery"><p>DANS LA JUNGLE</p></button>
                </div>
                </div>
            </article>
        `,
        "anatoth": `
            <article>
                <h2 id="title_panel">ANATOTH</h2>
                <p id="subtitle_panel">EMPIRE EXPENSIONISTE <br>ET DESTRUCTEUR</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Autrefois le siège de la dynastie Loth, la ville semi souterraine d’Anatoth fut conquise lors d’une guerre sanglante, opposant les Asmodéens aux Elysoii. C’est dans le sang que la capitale d’Anatoth s’est développé sous le joug de la dynastie Elealeh.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "marah": `
            <article>
                <h2 id="title_panel">MARAH</h2>
                <p id="subtitle_panel">OLIGARCHIE RAYONNANTE</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La capitale de la dynastie Sakia, et l’une des plus anciennes cités de l’Histoire d’Erion. Protégé par d’immenses murailles, des montagnes, des eaux; la grande cité n’a que deux voies d’accès, les montagnes et sa baie qui ouvre sur la mer intérieure. La cité de Marah compte la plus grande population urbaine et les plus grands chantiers navals de tout le continent.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "hanoii": `
            <article>
                <h2 id="title_panel">HANOII</h2>
                <p id="subtitle_panel">LA GRANDE COURONNE</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Hanoii, la capitale de la dynastie Elhoi, est une cité imposante et splendide, véritable cœur du royaume. Située au sommet de collines verdoyantes, elle s'étend avec majesté sur des milliers de terrasses et de jardins suspendus. La ville est un mélange fascinant de grandioses palais impériaux, de bâtiments technologiquement avancés, et de quartiers marchands bourdonnants où se mêlent l'élite aristocratique et les citoyens plus modestes.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "noch": `
            <article>
                <h2 id="title_panel">NOCH</h2>
                <p id="subtitle_panel">MONARCHIE MATRIARCAL</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Noch, la capitale de la dynastie Enoch, est une cité majestueuse qui s’élève au cœur du désert, où le soleil brille sans relâche sur ses structures imposantes. La ville est construite en pierres de grès dorées, qui captent la lumière du jour pour en faire des éclats chauds et lumineux. Les murs des fortifications, robustes et massifs, sont renforcés par des métaux travaillés, principalement du bronze et du fer, qui semblent scintiller à l'horizon sous l'effet du soleil implacable. Ces fortifications protègent la cité des vents violents et des tempêtes de sable qui balaient régulièrement les plaines alentours</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "sinai": `
            <article>
                <h2 id="title_panel">SINAI</h2>
                <p id="subtitle_panel">EMPIRE ISOLATIONNISTE</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Sinai, se dresse fièrement sur une chaîne de montagnes enneigées, enveloppée dans un voile de mystère et de majesté. Les pierres grises et l'obsidienne, taillées avec une précision millénaire, composent la majorité des structures de la cité. Ces matériaux sombres, presque menaçants, reflètent l'austérité du climat et la force de l’empire Zillah. De grandes murailles de pierres et de glaces massives encerclent la ville, leurs surfaces luisantes captent la lumière de manière presque surnaturelle, formant des motifs géométriques qui semblent changer au rythme des saisons.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "sorek": `
            <article>
                <h2 id="title_panel">SOREK</h2>
                <p id="subtitle_panel">AUTOCRATIE VAILLANTE</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Sorek, la Cité Suspendue, bordant les falaises d’une ile volante au dessus des chaines de montagnes, elle est le centre névralgique de la lutte contre l’Alliance. Ses rues pavées, et ses bâtiments de roches et de marbres scintillent dans les nuages. Sorek, est divisé en deux parties. La ville principale, située sur l’île, et une autre partie sur la terre ferme, là ou se concentre une grande partie de la population, du commerce et du jeu militaire de cette nation. Fief secondé par la maison mineur Galderis, sous protectorat de la dynastie Tamlek et de la coalition.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        // DYNASTIES //
        "dyn-sakia": `
            <article>
                <h2 id="title_panel">Sakia</h2>
                <p id="subtitle_panel">OLIGARCHIE RAYONNANTE</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ASMODEENS</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">OLIGARCHIE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">ELEVEE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">TEMPERE</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La dynastie Sakia, l'un des régimes les plus anciens d'Erion, demeure un pilier central de l'Alliance, dirigée par une famille noble vénérable dont le siège est la majestueuse cité de Marah. À l’origine du conflit qui déchire le monde depuis plus d’un millénaire, la dynastie Sakia a vu ses ambitions se déployer au-delà des frontières de sa propre lignée, engendrant une multitude de dynasties majeures et mineures qui continuent de modeler l’avenir d’Erion. Forte de siècles de pouvoir et de stratégie, elle est devenue l'influence dominante dans la politique d'Erion, tissant une toile complexe de relations et de hiérarchies. Pourtant, derrière cette immense puissance se cachent des traditions séculaires et des mystères anciens, tandis que la famille Sakia, malgré son ascendant inébranlable, se trouve parfois confrontée à des défis internes pour préserver son autorité dans un monde en perpétuelle évolution.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "dyn-uriah": `
            <article>
                <h2 id="title_panel">Uriah</h2>
                <p id="subtitle_panel">MONARCHIE GLORIEUSE</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ASMODEENS</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">MONARCHIE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">INTERMEDIAIRE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">JUNGLE</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La glorieuse monarchie sous le règne de la dynastie Uriah, siégeant dans la majestueuse cité d’Havilah, incarne la puissance et l’influence suprêmes au sein de l'Alliance. Reconnue comme la maison la plus influente de tout le camp, elle est le cœur battant des intrigues politiques, un véritable centre de pouvoir où l’avenir de l’Alliance se joue à chaque mouvement. À sa tête, un roi issu d'une lignée prestigieuse, entouré de sa famille et de ses cousins les plus proches, impose son autorité avec sagesse et détermination. La dynastie Uriah est un modèle de raffinement et de discipline, et son rayonnement dépasse largement les frontières de son propre domaine. Son éclat, tant en termes de beauté que de principes moraux, suscite à la fois l'admiration et la crainte, attirant autant les alliés que les ennemis. Ses codes d’honneur stricts et ses idéaux de grandeur façonnent une société dont l’élite aspire à l'excellence, tout en maintenant un équilibre délicat entre diplomatie et puissance militaire. </p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                
                
            </article>
        `,
        "dyn-elealeh": `
            <article>
                <h2 id="title_panel">Elealeh</h2>
                <p id="subtitle_panel">EMPIRE EXPANSIONITE<br> ET DESTRUCTEUR</p>
                <div class="espace-block"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ASMODEENS</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">EMPIRE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">INTERMEDIAIRE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">JUNGLE</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La dynastie Elealeh, autrefois une maison mineure, a connu une ascension fulgurante pour devenir l'une des puissances les plus redoutées et agressives de l'Alliance. Dirigeant un empire expansionniste et impitoyable, elle est désormais la force motrice derrière certaines des opérations les plus destructrices du conflit. Propulsée par une insatiable soif de pouvoir et un désir de dominer, elle mène une guerre implacable contre les ennemis de l'Alliance, s'appuyant sur une stratégie sans compromis. Toutefois, derrière l’apparente brutalité de leur politique, la dynastie Elealeh cache une société raffinée et culturellement riche. Sa tolérance et sa piété, bien que souvent ignorées, sont au cœur de leur identité, offrant un environnement où même les étrangers peuvent trouver leur place et gravir les échelons du pouvoir. Dans ce cadre, chacun peut espérer accéder aux plus hautes sphères de leur gouvernement, à condition de prouver sa loyauté et sa valeur.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "dyn-enoch": `
            <article>
                <h2 id="title_panel">Enoch</h2>
                <p id="subtitle_panel">MONARCHIE MATRIARCAL</p>
                <div class="espace-block"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ELYSOII</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">MONARCHIE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">INTERMEDIAIRE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">DESERTIQUE</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La dynastie Enoch, se distingue par son régime politique, une monarchie matriarcal. Dirigée par une Reine/Matriarche, qui est à la tête du pays et de sa famille, elle incarne la puissance absolue, aux yeux de son peuple. Etablie au cœur des régions désertiques, cette dynastie a appris à prospérer dans des conditions difficiles, ou les températures et les terres arides ne laissent place qu’à ceux qui savent s’adapter. Soutenue par une forte expérience dans la gestion des ressources, et des efforts. Leur politique est subtile et calculée, un mélange de fermeté et de sagesse ou chaque décision est prise consciemment. Malgré leur éloignement du reste de la coalition, la cité de Noch et ses dirigeants se distinguent par la plus riche et bénéfique nation du monde.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "dyn-zillah": `
            <article>
                <h2 id="title_panel">Zillah</h2>
                <p id="subtitle_panel">EMPIRE ISOLATIONNISTE</p>
                <div class="espace-block"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ELYSOII</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">EMPIRE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">FAIBLE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">GLACE</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La dynastie Zillah, l’une des grandes maisons nobles de la Coalition, régit un empire situé dans les froides étendues enneigées du nord. Bien que leur technologie reste modeste comparée à celle des autres puissances, leur maîtrise des anciennes techniques artisanales et militaires est inégalée. L’empire Zillah est marqué par un isolement volontaire, tant géographique que social. Les rapports au sein de la société sont stricts et rigides, où les relations sont souvent froides et formelles. Pourtant, bien que le régime prône une forme d’autarcie, il est indéniablement impliqué dans la guerre contre les Asmodéens, apportant son soutien tactique et stratégique à la Coalition, néanmoins avec une certaine réserve. L’isolement de la dynastie Zillah n’empêche pas une certaine collaboration avec leurs alliés, mais leur cœur reste tourné vers la préservation de leur autonomie et de leur indépendance, quitte à faire face seul aux dangers qui les entourent, notamment avec les Asmodéens qui se trouvent aux portes de leur empire.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "dyn-tamlek": `
            <article>
                <h2 id="title_panel">Tamlek</h2>
                <p id="subtitle_panel">AUTOCRATIE VAILLANTE</p>
                <div class="espace-block"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ELYSOII</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">AUTOCRATIE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">INTERMEDIAIRE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">TEMPEREE</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">A la tête d’une puissante autocratie, elle se distingue parmi les grandes familles de la coalition par son pragmatisme et son sens de l’opportunité. Les Tamlek, d’avant et d’aujourd’hui ont su tiré bénéfice de leur position stratégique dans le conflit contre l’alliance. Aux origines, en quête d’une victoire rapide et décisive, cette aristocratie s’est embourbé dans une guerre de miles ans au destin incertain. A l’intérieur de son territoire, une stabilité marquée par une profonde hiérarchie qui sépare les classes. Une société axée à une forme de soumission toléré et pratique à tous. Néanmoins, ils ont su tirer une forme de raffinement culturel, dans les codes et leurs valeurs, indépendamment des classes. Une culture commune, par les arts, et les rituels sociaux qui les éduquent. Leur autorité est incontestée, mais leur peuple est loin d’être homogène depuis la défaite d’Anatoth. </p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "dyn-elhoi": `
            <article>
                <h2 id="title_panel">Elhoi</h2>
                <p id="subtitle_panel">LA GRANDE COURONNE</p>
                <div class="espace-block"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ELYSOII</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">MONARCHIE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">ELEVEE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">TEMPEREE</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La dynastie Elhoi, à l'origine de la guerre millénaire qui déchire Erion, est une monarchie imposante, surnommée "La Grande Couronne", qui brille par sa richesse et sa sophistication. Leur société est fondée sur des hiérarchies strictes, et les codes de conduite nobles sont sacrés, si bien que les élites vivent dans un monde presque irréel, où l’argent, l’influence et l’apparence dominent. A l’origine de ce conflit sanglant, par les coups bas proférés par leur ascendance, elle continue de régner depuis avec une poigne de fer. Bien qu’un malaise subsiste quant à l’origine de ce conflit, les ambitions personnelles et la soif de pouvoir continuent d’alimenter des intrigues qui fragilisent l’autorité.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "dyn-loth": `
            <article>
                <h2 id="title_panel">Loth</h2>
                <p id="subtitle_panel">LE PEUPLE SANS PAYS</p>
                <div class="espace-block"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <ul class="contentdetails_stat">
                    <li class="stat_root">
                        <h4 class="stat_label">Faction :</h4>
                        <h5 class="stat_value">ELYSOII</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Gouvernement :</h4>
                        <h5 class="stat_value">ARISTOCRATIE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Technologie :</h4>
                        <h5 class="stat_value">INTERMEDIAIRE</h5>
                    </li>
                    <li class="stat_root">
                        <h4 class="stat_label">Environement générale :</h4>
                        <h5 class="stat_value">MARAIS</h5>
                    </li>
                </ul>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">La dynastie Loth, une famille aristocratique vieille de plus d’un millier d’années, conserve une grande puissance militaire et d’influence, malgré la défaite à Anatoth, leur siège millénaire, d’où elle gouvernait fièrement, maintenant sous le contrôle de la Dynastie Elealeh. Le gouvernement fut transféré à Japheth, métropole de Tamlek, sur lesquels reposent des valeurs d’honneur et de devoir en vers leur peuple qui ont été bafoués. Ils se sont mis en retrait du conflit, le temps de prévoir une suite pour leur peuple en fuite, et eux-mêmes.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        // VILLES //
        "city_almon": `
            <article>
                <h2 id="title_panel">SOREK</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE SAKIA</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Almon, grande cité de la dynastie Sakia, s’élève majestueusement au cœur de vastes plaines verdoyantes et rocailleuses. Cette cité antique, dont l’architecture millénaire témoigne de la richesse de son histoire, est un véritable bastion de la guerre. Les bâtiments en métal, en pierre et en bois ancien, robustes et élégants, sont parfaitement intégrés à leur environnement naturel, alliant tradition et force. Chaque mur semble raconter des siècles de défense et de résilience. Almon joue un rôle majeur dans les conflits qui secouent la région, occupant une position stratégique de premier plan dans la guerre. Sa grande forteresse, au centre de la ville, est le symbole de son pouvoir militaire et de son influence dans la région. Entourée de fortifications et de campements militaires, la cité est une plaque tournante pour l’approvisionnement et le commandement. Fier et résistant, Almon est un véritable rempart, où l’histoire de la dynastie Sakia continue de se forger à travers la guerre.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_ayalon": `
            <article>
                <h2 id="title_panel">AYALON</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE URIAH</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Ayalon, bastion de la dynastie Uriah, est l'une des rares cités capables d’opposer une résistance efficace aux armées de la dynastie Elhoi. Située à proximité des montagnes de l’Oubli, elle bénéficie d’une position stratégique qui en fait une porte d’entrée incontournable vers le continent pour l'Alliance. La ville se distingue par son cadre naturel exceptionnel : des jardins luxuriants, des verdures à perte de vue, et des arbres majestueux ornent les rues, créant une atmosphère sereine et protégée. Les bâtiments, taillés directement dans les falaises, semblent surgir de la roche elle-même, offrant à la ville une forte impression de solidité et d'harmonie avec son environnement. Les fortifications naturelles, formées de montagnes escarpées et de gorges profondes, rendent la ville difficilement accessible et presque imprenable. Ayalon incarne la résistance tranquille mais déterminée de la dynastie Uriah, alliant beauté, nature et puissance défensive.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_bashan": `
            <article>
                <h2 id="title_panel">ENOCH</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE ENOCH</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Bashan, la métropole de la dynastie Enoch, est une seconde cité établie au cœur des sables émeraudes, un désert impitoyable où la chaleur et les tempêtes de sable règnent en maîtres. Conçue pour survivre dans ce terrain extrême, la ville se distingue par ses fortifications impressionnantes et son architecture unique. Les bâtiments de grès, de métal et d’or sont disposés de manière à réfléchir la lumière intense du soleil, créant une atmosphère lumineuse et étincelante en pleine chaleur. Les structures sont parfaitement adaptées aux conditions désertiques : les murs épais protègent des températures écrasantes et des vents violents, tandis que les toitures, en métal précieux, captent la lumière pour éclairer la ville sans chaleur supplémentaire. Bashan est une ville en harmonie avec son environnement, où la richesse des matériaux et l’ingéniosité de sa construction permettent de dominer les éléments et d’assurer la prospérité de la dynastie Enoch. Ce lieu, avec ses éclats dorés, se dresse fièrement comme un symbole de puissance et de résilience au cœur du désert.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_caris": `
            <article>
                <h2 id="title_panel">CARIS</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE URIAH</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Caris, située au nord de Havilah, capitale de la dynastie Uriah, est une métropole riche et dynamique, bâtie avec finesse dans les collines et sur les rochers environnants. La ville se distingue par une architecture qui épouse parfaitement son terrain, avec des bâtiments suspendus et des ponts reliant des quartiers perchés au-dessus des vallées profondes. De magnifiques arbres ornent la ville, apportant fraîcheur et beauté au milieu des structures solides et imposantes. Les protections naturelles, telles que les falaises escarpées et les rivières sinueuses, renforcent la sécurité de la cité tout en contribuant à son aspect pittoresque. Caris est non seulement un centre économique majeur pour la dynastie Uriah, mais elle est aussi le cœur commercial de la région. Grâce à son emplacement stratégique et à son réseau de routes commerciales, elle joue un rôle crucial dans le commerce et la prospérité de l’Alliance. Avec ses marchés animés, ses artisans talentueux et son rôle central dans l’économie, Caris incarne la richesse et la puissance tranquille de la dynastie Uriah.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_eshton": `
            <article>
                <h2 id="title_panel">ESHTON</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE ENOCH</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Eshton, située entre Noch à l'ouest et Rama au nord, se trouve au sud des Montagnes de l'Oubli, à un carrefour stratégique reliant plusieurs grandes cités. Elle joue un rôle clé en tant que point de passage pour le commerce entre les alliés de la dynastie Enoch, facilitant les échanges entre Rama, Ayalon et la capitale de la dynastie. Cette ville, nichée au cœur de paysages montagneux, est un carrefour vital pour les routes commerciales terrestres et maritimes. L'architecture d'Eshton est typique de celle de la dynastie Enoch, un mélange de grandeur et de fonctionnalité, avec des bâtiments de grès et de métal finement sculptés. Le port, le plus important de la dynastie, est un centre névralgique où se croisent navires marchands, militaires et marchands étrangers. Entourée de murailles solides et de fortifications naturelles, la ville est un bastion de prospérité et de défense, reflet du dynamisme d'Enoch et de son influence croissante.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_ezer": `
            <article>
                <h2 id="title_panel">EZER</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE URIAH</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Ezer, autrefois sous le contrôle de la dynastie Zillah, est désormais occupée par la dynastie Uriah depuis la dernière campagne militaire. Située à l'est de l'Empire de Zillah, la ville joue un rôle stratégique crucial, agissant comme un pont vers les terres glacées. Bien que prise initialement par la dynastie Elealeh, elle a été transférée sous la juridiction d'Uriah, renforçant la position de cette dernière dans la région. L'architecture d'Ezer, typique de la dynastie Zillah, a été largement préservée malgré les ravages de la guerre. Ses bâtiments, principalement faits de pierres froides et de glace, témoignent de l'ingéniosité de son peuple. Les murailles, épaisses et imposantes, sont parfaites pour résister aux conditions rigoureuses de la région. La ville reste un centre névralgique où s’entrelacent les cultures des Zillah, des Elealeh et maintenant des Uriah, mais son avenir demeure incertain, balancé entre ses anciennes traditions et les nouvelles dynamiques de pouvoir.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_galaad": `
            <article>
                <h2 id="title_panel">GALAAD</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE TAMLEK</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Galaad, majestueuse métropole des Tamlek, se dresse en bastion stratégique, une porte sur le sud d’Erion. Son immense port, à la fois militaire et commercial, assure un lien vital avec la monarchie matriarcale des Enoch et les autres puissances alliées. Flottilles marchandes et navires de guerre y croisent sans cesse, témoignant de son rôle clé dans l’effort de guerre et l’économie régionale. Son architecture, mélange audacieux de métal, de marbre, de pierre et de bois, reflète la puissance et le raffinement des Tamlek. De vastes avenues bordées de colonnes mènent à des palais imposants et des arsenaux fortifiés, où la discipline et l’opulence se rencontrent. Ville d’échanges et de conquêtes, Galaad incarne l’ambition expansionniste des Tamlek, tout en restant un symbole de leur splendeur et de leur ingéniosité.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_gibeon": `
            <article>
                <h2 id="title_panel">GIBEON</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE ELEALEH</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Gibeon, récente conquête des Elealeh, s’étend au creux d’une baie au sud-ouest de Sorek. Autrefois cité tamlekienne prospère, elle est aujourd’hui en pleine transition sous l’occupation. Tandis que les colons et les forces militaires s’installent, une partie de la population choisit l’exil, quittant librement la ville pour éviter le joug de l’envahisseur. L’architecture massive et fonctionnelle des Tamlek, faite de pierre robuste et de structures imposantes, est peu à peu altérée par les transformations imposées par les Elealeh. D’anciennes places sont réaménagées en camps fortifiés, et de hautes murailles sombres s’élèvent autour des quartiers stratégiques. Le port, autrefois carrefour commercial vital, est désormais sous contrôle militaire, renforçant la présence de l’Empire dans la région. Malgré l’occupation, Gibeon reste une ville à l’identité marquée, tiraillée entre son passé et son avenir incertain.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_hermon": `
            <article>
                <h2 id="title_panel">HERMON</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE SAKIA</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Hermon, autrefois fièrement dirigée par la dynastie Zillah, est désormais sous occupation de la dynastie Sakia après la dernière campagne. Située à l’entrée des terres glacées, Hermon demeure une porte stratégique vers l’empire de Zillah, malgré les ravages des batailles passées. La ville conserve son architecture typique, qui a su résister aux épreuves du temps et aux conflits. Ses immenses obélisques d’obsidienne, érigés fièrement sur les places, se dressent comme des symboles de la puissance d’antan. Les murailles, composées de glace et de pierres, offrent une défense implacable contre les assauts extérieurs, tout en ajoutant à l’esthétique froide et austère de la ville. Malgré les destructions causées par les récents affrontements, l’âme d’Hermon demeure intacte, un mélange de traditions anciennes et de résilience face aux nouvelles réalités imposées par l’occupation.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_japheth": `
            <article>
                <h2 id="title_panel">JAPHETH</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE TAMLEK</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Japheth, imposante métropole de la dynastie Tamlek, se dresse sur les rives d’un vaste port stratégique, essentiel au commerce et aux opérations militaires de la nation. Ses immenses murailles encadrent une ville animée, où se mêlent soldats, marchands et nobles. Au cœur de la cité, un colossal château domine l’horizon, témoin de la puissance et de la grandeur des Tamlek, dont l’architecture majestueuse reflète leur richesse et leur ambition. Les marais environnants, naturels et aménagés, servent à la fois de barrière défensive et de ressource pour la ville, créant un paysage unique, mêlant splendeur et rudesse. L’arrivée des Loth, en exil après la chute d’Anatoth, a transformé un quartier entier en enclave aristocratique, où ces nobles déchus tentent de préserver leur culture et leur influence. Japheth, véritable cœur militaire et civil de la nation, incarne la résilience des Tamlek face à la guerre et leur volonté d’imposer leur suprématie.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_rama": `
            <article>
                <h2 id="title_panel">RAMA</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE ELHOI</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Rama, récente mais imposante cité de la dynastie Elhoi, s’affirme comme un point stratégique incontournable dans le contrôle de l’est de la mer des Larmes. Située aux abords des mystérieuses montagnes de l'Oubli, elle est devenue un centre névralgique pour les opérations militaires et commerciales de la dynastie, rivalisant désormais avec les plus grandes cités d'Erion. Son architecture, typique des Elhoi, est un spectacle de grandeur et de maîtrise technique : de vastes arches élancées, des ponts impressionnants enjambant des ravins et des murailles de pierre noire dressées pour protéger la ville des invasions. Les bâtiments, d’une esthétique raffinée, sont souvent dotés de détails ornementaux inspirés des traditions élites, tandis que les rues sont bordées de statues et de bas-reliefs racontant l’histoire de la dynastie. Rama, bien que jeune, incarne déjà la puissance militaire et l’ambition de la grande couronne, tentant de dominer la région et contrôler les voies maritimes et terrestres cruciales.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_ramoth": `
            <article>
                <h2 id="title_panel">RAMOTH</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE ELEALEH</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Ramoth, jadis cité prospère sous la gouvernance de la dynastie Loth, est aujourd’hui un bastion clé de l’empire expansionniste des Elealeh. Située aux abords d’un large fleuve, à proximité d’un lac aux eaux calmes, la ville a vu son visage métamorphosé par l’occupation et l’aménagement militaire. Les vestiges de son ancienne architecture, dominée par des structures de bois finement sculptées et des places ouvertes, se mêlent désormais aux imposantes constructions de pierres noires caractéristiques des Elealeh. De hautes murailles, épaisses et sévères, encerclent la cité, témoignant de sa nouvelle vocation stratégique. À l’intérieur, d’anciennes maisons aux ornements délicats côtoient d’immenses bastions et casernes, faisant de Ramoth une plaque tournante essentielle à l’effort de guerre. Les rues, jadis animées par le commerce, sont aujourd’hui parcourues par des régiments en marche, leurs bannières flottant au vent. Pourtant, malgré la militarisation, la ville conserve une certaine élégance, fusionnant l’héritage raffiné des Loth avec la rigueur architecturale des Elealeh. Un équilibre fragile entre tradition et conquête, entre mémoire et domination.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        "city_yibleam": `
            <article>
                <h2 id="title_panel">YIBLEAM</h2>
                <p id="subtitle_panel">CITE DE LA DYNASTIE ELHOI</p>
                <div class="espace-block-1"></div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
                <div id="desc-margin">
                    <div id="desc-container">
                        <span><p id="p-container">Yibléam, métropole stratégique de la dynastie Elhoi, est située près de la ligne de front  à proximité des puissantes cités de Havilah et Marah. En première ligne, elle incarne l'effervescence de la guerre, tout en restant une vitrine de la grandeur et de la richesse d'Elhoi. Ses fortifications impressionnantes, constituées de murailles massives et de tours de guet imposantes, assurent une défense sans faille contre les attaques. À l'intérieur de la ville, l'architecture se distingue par une élégance ostentatoire : des palais somptueux, des statues majestueuses et des bâtiments sculptés dans la pierre noire, symboles de la puissance de la dynastie. Autour de la ville, un immense campement militaire s’étend, avec des rangées de tentes et de fortifications temporaires, où soldats et officiers se préparent aux affrontements imminents. Yibléam, bien que marquée par la guerre, reste une démonstration éclatante du raffinement d’Elhoi, où la richesse et le prestige se mêlent à l’urgence de la défense.</p></span>
                    </div>
                </div>
                <figure class="divider-root">
                <div class="divider-middle"></div>
                </figure>
            </article>
        `,
        // TREFONDS //
    };
    const galleryMap = {
        "palaishavilah-gallery": `
            <article>
            <div class="gimg" >
            <img src="assets/images/illustrations/palaishavilah.jpg" alt="gimg">
            </div>
            <div id="gcontent">
                <p id="g_page">01/01</p>
                <h2 id="gall_title">LE PALAIS D'HAVILAH</h2>
                 <p id="gall_subtittle">FOYER DE LA DYNASTIE URIAH</p>
                 <p id="gall_desc">Le palais d'Havilah est une merveille architecturale ancienne, qui borde une falaise, relié par des points au reste de la ville. Elle construit une harmonie parfaite entre la flore, qui pousse sans cesse et les parois, les murs, les structures de la ville. C'est un lieu de fraicheur et de grandeur. Des colonnes sculptées et des arches majestueuses soutiennent les niveaux supérieurs, tandis que des tapis de fleurs, de lianes et des plantes grimpantes ornent les murs extérieurs. Chaque espace est soigneusement aménagé, avec des jardins secrets, des fontaines et des pièces de repos qui respirent la tranquillité. Le palais, bien qu'imposant, conserve une légèreté, presque organique, comme si la nature elle-même avait été incluse dans sa conception. L'ombre des arbres gigantesques et la brise fraîche venant des montagnes apportent une atmosphère de calme et de majesté à ce lieu, au cœur du pouvoir de la dynastie Uriah. Il est à la fois un symbole de richesse, de pouvoir et de connexion profonde avec la nature, un véritable centre de commandement pour la nation.</p>
            </div>
            </article>
        `,
        "danslajungle-gallery": `
            <article>
            <div class="gimg" >
            <img src="assets/images/illustrations/danslajungle.jpg" alt="gimg">
            </div>
            <div id="gcontent">
                <p id="g_page">01/01</p>
                <h2 id="gall_title">DANS LA JUNGLE</h2>
                 <p id="gall_subtittle">LA NATURE</p>
                 <p id="gall_desc">La jungle qui borde Havilah est d’une beauté à couper le souffle, mais aussi d’une nature envahissante. En quelques semaines seulement, la végétation luxuriante prend d’assaut les limites de la ville, les arbres gigantesques enserrant les structures humaines de leurs racines et leurs lianes. Les murs des bâtiments sont recouverts de plantes grimpantes, tandis que des fleurs éclatantes apportent des touches de couleur vives au milieu des pierres grises. L’humidité ambiante favorise une croissance rapide, et la jungle semble vouloir engloutir tout sur son passage. Les racines se faufilent dans les fissures des pierres, et des lianes épaises descendent des arbres comme des tentacules vivantes. L’air est saturé de parfums floraux et de bruits incessants d’insectes et d’animaux. Cette nature est à la fois une bénédiction, offrant une richesse en ressources naturelles, et une malédiction, nécessitant un entretien constant pour éviter qu’elle ne submerge la ville. Des équipes spécialisées veillent sur cette coexistence fragile, mais la jungle conserve toujours sa force sauvage et implacable.</p>
            </div>
            </article>
        `,
    };
    document.querySelectorAll(".icon").forEach(icon => {
        icon.addEventListener("click", () => {
            const iconId = icon.getAttribute("id");
            const content = contentMap[iconId];
            panelContent.innerHTML = content;
            panelContent.querySelectorAll(".open-gallery").forEach(button => {
                button.addEventListener("click", () => {
                    const galleryId = button.getAttribute("data-gallery");
                    const galleryContentHtml = galleryMap[galleryId];
                    galleryContent.innerHTML = galleryContentHtml;
                    galleryPanel.classList.add("open");
                    sidePanel.classList.remove("open");
                });
            });
            sidePanel.classList.add("open");
        });
    });
    closePanel.addEventListener("click", () => sidePanel.classList.remove("open"));
    closeGalleryPanel.addEventListener("click", () => galleryPanel.classList.remove("open"));
    document.addEventListener("click", (e) => {
        if (!sidePanel.contains(e.target) && !e.target.closest(".icon")) {
            sidePanel.classList.remove("open");
        }
        if (!galleryPanel.contains(e.target) && !e.target.closest(".open-gallery")) {
            galleryPanel.classList.remove("open");
        }
    });
});
//
// ICONS CLIKABLES FUNCTIONS -> FLYOUT -> TABLEAU D'INFORMATIONS
document.addEventListener("DOMContentLoaded", () => {
    const sideFlyPanel = document.getElementById("flyout_panel");
    const panelContent = document.getElementById("flypanel_content");
    const contentMap = {
        // CAPITALES //
        "havilah": `
            <article>
                <h2 id="title_flypanel">LE BASTION D'HAVILAH</h2>
                <p id="subtitle_flypanel">CAPITALE DE LA DYNASTIE URIAH</p>
            </article>
        `,
        "anatoth": `
            <article>
                <h2 id="title_flypanel">ANATOTH</h2>
                <p id="subtitle_flypanel">CAPITALE DE LA DYNASTIE ELEALEH</p>
            </article>
        `,
        "marah": `
            <article>
                <h2 id="title_flypanel">MARAH</h2>
                <p id="subtitle_flypanel">CAPITALE DE LA DYNASTIE SAKIA</p>
            </article>
        `,
        "sinai": `
            <article>
                <h2 id="title_flypanel">SINAI</h2>
                <p id="subtitle_flypanel">CAPITALE DE LA DYNASTIE ZILLAH</p>
            </article>
        `,
        "sorek": `
            <article>
                <h2 id="title_flypanel">SOREK</h2>
                <p id="subtitle_flypanel">CAPITALE DE LA DYNASTIE TAMLEK</p>
            </article>
        `,
        "hanoii": `
            <article>
                <h2 id="title_flypanel">HANOII</h2>
                <p id="subtitle_flypanel">CAPITALE DE LA DYNASTIE ELHOI</p>
            </article>
        `,
        "noch": `
            <article>
                <h2 id="title_flypanel">NOCH</h2>
                <p id="subtitle_flypanel">CAPITALE DE LA DYNASTIE ENOCH</p>
            </article>
        `,
        // DYNASTIES //
        "dyn-sakia": `
            <article>
                <h2 id="title_flypanel">SAKIA</h2>
                <p id="subtitle_flypanel">OLIGARCHIE RAYONNANTE</p>
            </article>
        `,
        "dyn-uriah": `
            <article>
                <h2 id="title_flypanel">URIAH</h2>
                <p id="subtitle_flypanel">MONARCHIE GLORIEUSE</p>
            </article>
        `,
        "dyn-elealeh": `
            <article>
                <h2 id="title_flypanel">ELEALEH</h2>
                <p id="subtitle_flypanel">EMPIRE EXPANSIONITE ET DESTRUCTEUR</p>
            </article>
        `,
        "dyn-enoch": `
            <article>
                <h2 id="title_flypanel">ENOCH</h2>
                <p id="subtitle_flypanel">MONARCHIE MATRIARCAL</p>
            </article>
        `,
        "dyn-zillah": `
            <article>
                <h2 id="title_flypanel">ZILLAH</h2>
                <p id="subtitle_flypanel">EMPIRE ISOLATIONISTE</p>
            </article>
        `,
        "dyn-tamlek": `
            <article>
                <h2 id="title_flypanel">TAMLEK</h2>
                <p id="subtitle_flypanel">AUTOCRATIE VAILLANTE</p>
            </article>
        `,
        "dyn-elhoi": `
            <article>
                <h2 id="title_flypanel">ELHOI</h2>
                <p id="subtitle_flypanel">LA GRANDE COURONNE</p>
            </article>
        `,
        "dyn-loth": `
            <article>
                <h2 id="title_flypanel">LOTH</h2>
                <p id="subtitle_flypanel">LE PEUPLE SANS PAYS</p>
            </article>
        `,
        // VILLES //
        "city_caris": `
            <article>
                <h2 id="title_flypanel">CARIS</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE URIAH </p>
            </article>
            `,
        "city_yibleam": `
            <article>
                <h2 id="title_flypanel">YIBLEAM</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE ELHOI </p>
            </article>
            `,
        "city_almon": `
            <article>
                <h2 id="title_flypanel">ALMON</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE SAKIA </p>
            </article>
            `,
        "city_hermon": `
            <article>
                <h2 id="title_flypanel">HERMON</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE SAKIA </p>
            </article>
            `,
        "city_ezer": `
            <article>
                <h2 id="title_flypanel">EZER</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE URIAH </p>
            </article>
            `,
        "city_ramoth": `
            <article>
                <h2 id="title_flypanel">RAMOTH</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE ELEALEH</p>
            </article>
            `,
        "city_gibeon": `
            <article>
                <h2 id="title_flypanel">GIBEON</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE ELEALEH</p>
            </article>
            `,
        "city_galaad": `
            <article>
                <h2 id="title_flypanel">GALAAD</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE TAMLEK</p>
            </article>
            `,
        "city_japheth": `
            <article>
                <h2 id="title_flypanel">JAPHETH</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE TAMLEK</p>
            </article>
            `,
        "city_ayalon": `
            <article>
                <h2 id="title_flypanel">AYALON</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE URIAH</p>
            </article>
            `,
        "city_rama": `
            <article>
                <h2 id="title_flypanel">RAMA</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE ELHOI</p>
            </article>
            `,
        "city_eshton": `
            <article>
                <h2 id="title_flypanel">ESHTON</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE ENOCH</p>
            </article>
            `,
        "city_bashan": `
            <article>
                <h2 id="title_flypanel">BASHAN</h2>
                <p id="subtitle_flypanel">CITE DE LA DYNASTIE ENOCH</p>
            </article>
            `,
        // TREFONDS //
        "trefond_a": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ A ] </h2>
                <p id="subtitle_flypanel">FORTERESSE ASMODEENNE</p>
            </article>
        `,
        "trefond_b": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ B ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ASMODEEN </p>
            </article>
        `,
        "trefond_c": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ C ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ELYSOII (EN CONFLIT </p>
            </article>
        `,
        "trefond_d": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ D ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ELYSOII (EN CONFLIT) </p>
            </article>
        `,
        "trefond_e": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ E ] </h2>
                <p id="subtitle_flypanel">BASTION ASMODEEN </p>
            </article>
        `,
        "trefond_f": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ F ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ELYSOII </p>
            </article>
        `,
        "trefond_g": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ G ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ELYSOII (EN CONFLIT) </p>
            </article>
        `,
        "trefond_h": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ H ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ASMODEEN </p>
            </article>
        `,
        "trefond_i": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ I ] </h2>
                <p id="subtitle_flypanel">BASTION ELYSOII </p>
            </article>
        `,
        "trefond_j": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ J ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ELYSOII </p>
            </article>
        `,
        "trefond_k": `
            <article>
                <h2 id="title_flypanel">ENTREE DES TREFONDS   [ K ] </h2>
                <p id="subtitle_flypanel">AVANT POSTE AVANCEE ELYSOII </p>
            </article>
        `,
    };
    document.querySelectorAll(".icon").forEach(icon => {
        icon.addEventListener("mouseover", () => {
            const iconId = icon.getAttribute("id");
            const content = contentMap[iconId];
            panelContent.innerHTML = content;
            sideFlyPanel.classList.add("open");
            const iconRect = icon.getBoundingClientRect();
            const panelWidth = sideFlyPanel.offsetWidth;
            sideFlyPanel.style.left = (iconRect.left + panelWidth > window.innerWidth) ?
                `${iconRect.left - panelWidth}px` : `${iconRect.right}px`;
            sideFlyPanel.style.top = `${iconRect.top}px`;
        });
        icon.addEventListener("mouseout", (event) => {
            if (!sideFlyPanel.contains(event.relatedTarget)) {
                sideFlyPanel.classList.remove("open");
            }
        });
    });
    sideFlyPanel.addEventListener("mouseout", (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            sideFlyPanel.classList.remove("open");
        }
    });
});
//
// La visibilité des éléments icons des capitales selon le zoom ! //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.icon.zcap');
    const minVisibleZoom = 2;
    const maxVisibleZoom = 5;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//
// La visibilité des éléments icons des villes  selon le zoom ! //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.icon.ztow');
    const minVisibleZoom = 2;
    const maxVisibleZoom = 5;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//
// La visibilité des éléments icons des tréfond  selon le zoom ! //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.icon.ztre');
    const minVisibleZoom = 3;
    const maxVisibleZoom = 5;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//
// La visibilité des éléments icons des dynasties selon le zoom ! //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.icon.zdyn');
    const minVisibleZoom = 1;
    const maxVisibleZoom = 2;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//

// Surligne le territoire de l'icone
document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll('.icon.dyn');

    icons.forEach(icon => {
        const imageId = icon.getAttribute('data-image-id');
        const relatedImage = document.getElementById(imageId);
        if (relatedImage) {
            icon.addEventListener('mouseover', () => {
                relatedImage.style.visibility = 'visible';
                relatedImage.style.opacity = '1';
                relatedImage.style.transition = 'opacity 0.3s ease';
            });
            icon.addEventListener('mouseout', () => {
                relatedImage.style.opacity = '0';
                setTimeout(() => {
                    relatedImage.style.visibility = 'hidden';
                }, 300);
            });
        } else {
            console.warn(`Image associée introuvable pour l'icône avec ID : ${icon.id}`);
        }
    });
});
//
// La visibilité : POI TXT 1 //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.poi.txt1');
    const minVisibleZoom = 1;
    const maxVisibleZoom = 2;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//
// La visibilité : POI TXT 2 //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.poi.txt2');
    const minVisibleZoom = 2;
    const maxVisibleZoom = 4;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//
// La visibilité : POI TXT 3 //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.poi.txt3');
    const minVisibleZoom = 3;
    const maxVisibleZoom = 5;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//
// La visibilité : POI TXT 4 //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.poi.txt4');
    const minVisibleZoom = 4;
    const maxVisibleZoom = 5;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//
// La visibilité : POI TXT 5 //
document.addEventListener("DOMContentLoaded", () => {
    const zoom = document.getElementById("zoom");
    const icons = document.querySelectorAll('.poi.txt5');
    const minVisibleZoom = 4;
    const maxVisibleZoom = 5;
    const getZoomLevel = () => parseFloat(window.getComputedStyle(zoom).transform.split(',')[0].split('(')[1]) || 1;
    const updateIconVisibility = () => {
        const zoomLevel = getZoomLevel();
        icons.forEach(icon => {
            const isVisible = zoomLevel >= minVisibleZoom && zoomLevel <= maxVisibleZoom;
            icon.style.visibility = isVisible ? 'visible' : 'hidden';
            icon.style.opacity = isVisible ? '1' : '0';
        });
    };
    updateIconVisibility();
    ['wheel', 'transitionend', 'mouseup', 'touchend'].forEach(event =>
        zoom.addEventListener(event, updateIconVisibility)
    );
});
//




