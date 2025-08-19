
/* I heard this file wasnt being used anymore, so
    I am re-using it to seperate the data from
    the main js - TheLadyLuthien */

    const fleshTones = [
        {
            name: "Light Nougat",
            color: "#F5C189",
            description: "Light peachy flesh tone",
            cultural: "Introduced in 2003, representing lighter flesh tones in licensed sets.",
            available: true
        },
        {
            name: "Medium Nougat",
            color: "#E09864",
            description: "Medium peachy flesh tone",
            cultural: "A medium tone introduced for more diverse representation.",
            available: true
        },
        {
            name: "Nougat",
            color: "#D4A574",
            description: "Standard nougat flesh tone",
            cultural: "One of the original flesh tones, representing medium skin.",
            available: true
        },
        {
            name: "Medium Dark Flesh",
            color: "#B5856B",
            description: "Medium brown flesh tone",
            cultural: "Representing medium-dark flesh tones for diverse minifigures.",
            available: true
        },
        {
            name: "Dark Nougat",
            color: "#A0633D",
            description: "Dark brown flesh tone",
            cultural: "Introduced for better representation of darker flesh tones.",
            available: true
        },
        {
            name: "Dark Brown",
            color: "#532115",
            description: "Deep brown flesh tone",
            cultural: "The darkest official LEGO flesh tone for maximum diversity.",
            available: true
        },
        {
            name: "Reddish Brown",
            color: "#884A2E",
            description: "Warm reddish-brown flesh tone",
            cultural: "A warm-toned option for diverse representation.",
            available: true
        },
        {
            name: "Vitiligo Pattern",
            color: "#D4A574",
            patchColor: "#F5C189",
            description: "Representing vitiligo skin condition",
            cultural: "Vitiligo is a condition where patches of skin lose their pigment. Representation matters for everyone.",
            available: false,
            isVitiligo: true
        }
    ];
    
    // Data for expressions
    const expressions = [
        {
            name: "Happy",
            description: "Cheerful, joyful smile",
            images: {
                "light-nougat": "images/light-nougat-happy.jpg",
                "medium-nougat": "images/medium-nougat-happy.jpg",
                "nougat": "images/nougat-happy.jpg",
                "medium-dark-flesh": "images/medium-dark-flesh-happy.jpg",
                "dark-nougat": "images/dark-nougat-happy.jpg",
                "dark-brown": "images/dark-brown-happy.jpg",
                "reddish-brown": "images/reddish-brown-happy.jpg",
                "vitiligo-pattern": "images/vitiligo-pattern-happy.jpg",
            },
            availability: {
                "light-nougat": true,
                "medium-nougat": false,
                "nougat": false,
                "medium-dark-flesh": false,
                "dark-nougat": false,
                "dark-brown": false,
                "reddish-brown": false,
                "vitiligo-pattern": true,
            },
            brickLinkUrls: {
                "light-nougat": "https://www.bricklink.com/v2/catalog/catalogitem.page?P=3626pb3418#T=C&C=90",
                "vitiligo-pattern": "https://bricklink.com/v2/catalog/catalogitem.page?P=3626pb3169",
            },
            partNumber: "3626pb3418",
        },
        {
            name: "Confident",
            description: "Self-assured, determined look",
            images: {
                "light-nougat": "images/light-nougat-confident.jpg",
                "medium-nougat": "images/medium-nougat-confident.jpg",
                "nougat": "images/nougat-confident.jpg",
                "medium-dark-flesh": "images/medium-dark-flesh-confident.jpg",
                "dark-nougat": "images/dark-nougat-confident.jpg",
                "dark-brown": "images/dark-brown-confident.jpg",
                "reddish-brown": "images/reddish-brown-confident.jpg",
                "vitiligo-pattern": "images/vitiligo-pattern-confident.jpg",
            },
            availability: {
                "light-nougat": true,
                "medium-nougat": false,
                "nougat": false,
                "medium-dark-flesh": true,
                "dark-nougat": false,
                "dark-brown": false,
                "reddish-brown": true,
                "vitiligo-pattern": false,
            },
            brickLinkUrls: {
                "light-nougat": "https://bricklink.com/v2/catalog/catalogitem.page?P=3626pb3061",
                "medium-dark-flesh": "https://bricklink.com/v2/catalog/catalogitem.page?P=3626pb3168",
                "reddish-brown": "https://bricklink.com/v2/catalog/catalogitem.page?P=3626pb3164",
            },
            partNumber: "3626cpb2743",
        },
        {
            name: "Thoughtful",
            description: "Contemplative, wise expression",
            images: {
                "light-nougat": "images/light-nougat-thoughtful.jpg",
                "medium-nougat": "images/medium-nougat-thoughtful.jpg",
                "nougat": "images/nougat-thoughtful.jpg",
                "medium-dark-flesh": "images/medium-dark-flesh-thoughtful.jpg",
                "dark-nougat": "images/dark-nougat-thoughtful.jpg",
                "dark-brown": "images/dark-brown-thoughtful.jpg",
                "reddish-brown": "images/reddish-brown-thoughtful.jpg",
                "vitiligo-pattern": "images/vitiligo-pattern-thoughtful.jpg",
            },
            availability: {
                "light-nougat": true,
                "medium-nougat": true,
                "nougat": true,
                "medium-dark-flesh": true,
                "dark-nougat": true,
                "dark-brown": true,
                "reddish-brown": true,
                "vitiligo-pattern": false,
            },
            partNumber: "LEGO-3626bpb0540",
        },
        {
            name: "Neutral",
            description: "Calm, peaceful expression",
            images: {
                "light-nougat": "images/light-nougat-neutral.jpg",
                "medium-nougat": "images/medium-nougat-neutral.jpg",
                "nougat": "images/nougat-neutral.jpg",
                "medium-dark-flesh": "images/medium-dark-flesh-neutral.jpg",
                "dark-nougat": "images/dark-nougat-neutral.jpg",
                "dark-brown": "images/dark-brown-neutral.jpg",
                "reddish-brown": "images/reddish-brown-neutral.jpg",
                "vitiligo-pattern": "images/vitiligo-pattern-neutral.jpg",
            },
            availability: {
                "light-nougat": true,
                "medium-nougat": true,
                "nougat": true,
                "medium-dark-flesh": true,
                "dark-nougat": true,
                "dark-brown": true,
                "reddish-brown": true,
                "vitiligo-pattern": false,
            },
            partNumber: "LEGO-3626bpb0001",
        },
        {
            name: "Excited",
            description: "Enthusiastic, energetic look",
            images: {
                "light-nougat": "images/light-nougat-excited.jpg",
                "medium-nougat": "images/medium-nougat-excited.jpg",
                "nougat": "images/nougat-excited.jpg",
                "medium-dark-flesh": "images/medium-dark-flesh-excited.jpg",
                "dark-nougat": "images/dark-nougat-excited.jpg",
                "dark-brown": "images/dark-brown-excited.jpg",
                "reddish-brown": "images/reddish-brown-excited.jpg",
                "vitiligo-pattern": "images/vitiligo-pattern-excited.jpg",
            },
            availability: {
                "light-nougat": true,
                "medium-nougat": true,
                "nougat": true,
                "medium-dark-flesh": true,
                "dark-nougat": true,
                "dark-brown": true,
                "reddish-brown": true,
                "vitiligo-pattern": false,
            },
            partNumber: "LEGO-3626bpb0999",
        },
        {
            name: "Focused",
            description: "Concentrated, attentive expression",
            images: {
                "light-nougat": "images/light-nougat-focused.jpg",
                "medium-nougat": "images/medium-nougat-focused.jpg",
                "nougat": "images/nougat-focused.jpg",
                "medium-dark-flesh": "images/medium-dark-flesh-focused.jpg",
                "dark-nougat": "images/dark-nougat-focused.jpg",
                "dark-brown": "images/dark-brown-focused.jpg",
                "reddish-brown": "images/reddish-brown-focused.jpg",
                "vitiligo-pattern": "images/vitiligo-pattern-focused.jpg",
            },
            availability: {
                "light-nougat": true,
                "medium-nougat": true,
                "nougat": true,
                "medium-dark-flesh": true,
                "dark-nougat": true,
                "dark-brown": true,
                "reddish-brown": true,
                "vitiligo-pattern": false,
            },
            partNumber: "LEGO-3626cpb2743",
        }
    ];
    
    // Data for accessories
    const accessories = [
        {
            name: "Glasses",
            description: "Classic eyeglasses",
            icon: "👓",
            available: true,
            partNumber: "LEGO-2423"
        },
        {
            name: "Hearing Aid",
            description: "Behind-the-ear hearing aid",
            icon: "🦻",
            available: false
        },
        {
            name: "Cochlear Implant",
            description: "External cochlear implant processor",
            icon: "📡",
            available: false
        }
    ];
    
    /*
    // Data for hair styles
    const hairStyles = [
        {
            name: "Afro + TWA + Puffs",
            images: ["images/afro-twa-puffs.jpg", "images/afro-twa-puffs_2.jpg"],
            colors: ["#8B4513", "#654321", "#2F1B14", "#D2691E"],
            description: "Natural afro, teeny weeny afro (TWA), and afro puffs",
            cultural: "The afro became a symbol of Black pride and natural beauty in the 1960s-70s. TWAs and puffs are practical, protective styles that celebrate natural hair texture.",
            brickLinkUrl: "https://www.bricklink.com/v2/catalog/catalogitem.page?P=12890",
            partNumber: "12890",
            available: true
        },
        {
            name: "Braids + Cornrows",
            images: ["images/braids-cornrows.jpg"],
            colors: ["#654321", "#8B4513", "#2F1B14", "#D2691E"],
            description: "Box braids, cornrows, and traditional braided styles",
            cultural: "Braiding has deep roots in African culture, with cornrows dating back over 3,000 years. These styles are both protective and carry cultural significance.",
            brickLinkUrl: "https://www.bricklink.com/v2/catalog/catalogitem.page?P=12891",
            partNumber: "12891",
            available: true
        },
        {
            name: "Curly + Coarse + Kinky Hair",
            images: ["images/curly.jpg", "images/curly_2.jpg"],
            colors: ["#8B4513", "#654321", "#2F1B14"],
            description: "Curly, coarse, and kinky hair textures",
            cultural: "These hair textures are celebrated for their versatility and beauty, representing natural Black hair in its many forms.",
            brickLinkUrl: "https://www.bricklink.com/v2/catalog/catalogitem.page?P=12893",
            partNumber: "12893",
            available: true
        }
    ];
    */
    // Availability data for expressions and accessories
    const availabilityData = {
        expressions: {
            Happy: {
                "Light Nougat": { available: true },
                "Medium Nougat": { available: false },
                "Nougat": { available: false },
                "Medium Dark Flesh": { available: false },
                "Dark Nougat": { available: false },
                "Dark Brown": { available: false },
                "Reddish Brown": { available: false },
                "Vitiligo Pattern": { available: true },
            },
            Confident: {
                "Light Nougat": { available: true },
                "Medium Nougat": { available: false },
                "Nougat": { available: false },
                "Medium Dark Flesh": { available: true },
                "Dark Nougat": { available: false },
                "Dark Brown": { available: false },
                "Reddish Brown": { available: true },
                "Vitiligo Pattern": { available: false },
            },
            Neutral: {
                "Light Nougat": { available: true },
                "Medium Nougat": { available: true },
                "Nougat": { available: false },
                "Medium Dark Flesh": { available: false },
                "Dark Nougat": { available: false },
                "Dark Brown": { available: false },
                "Reddish Brown": { available: true },
                "Vitiligo Pattern": { available: false },
            },
            Focused: {
                "Light Nougat": { available: true },
                "Medium Nougat": { available: false },
                "Nougat": { available: false },
                "Medium Dark Flesh": { available: true },
                "Dark Nougat": { available: false },
                "Dark Brown": { available: false },
                "Reddish Brown": { available: false },
                "Vitiligo Pattern": { available: false },
            },
            Glasses: {
                "Light Nougat": { available: true },
                "Medium Nougat": { available: true },
                "Nougat": { available: true },
                "Medium Dark Flesh": { available: false },
                "Dark Nougat": { available: false },
                "Dark Brown": { available: false },
                "Reddish Brown": { available: false },
                "Vitiligo Pattern": { available: false },
            },
            HearingAid: {
                "Light Nougat": { available: false },
                "Medium Nougat": { available: false },
                "Nougat": { available: false },
                "Medium Dark Flesh": { available: true },
                "Dark Nougat": { available: false },
                "Dark Brown": { available: false },
                "Reddish Brown": { available: false },
                "Vitiligo Pattern": { available: false },
            },
        },
    };
