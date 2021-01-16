let stats = {
    "hp": 10,
    "endurance": 10,
    "intelligence": 10,
    "strength": 10,
    "deffense": 10,
    "xp": 0
}

let remaining_points = 0;
let level = 0;


let level_description = [
    ["You are the weakest elf!", "elf_lvl0.png"],
    ["You have learnt how to control you mana!", "elf_lvl1.jpg"],
    ["You can speak with the animals so they fight by your side!", "elf_lvl2.jpg"],
    ["You are the Forest Monarch!", "elf_lvl3.jpg"]
]


let character_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "hp": document.getElementById("character_hp"),
    "endurance": document.getElementById("character_endurance"),
    "intelligence": document.getElementById("character_intelligence"),
    "strength": document.getElementById("character_strength"),
    "deffense": document.getElementById("character_deffense"),
    "xp": document.getElementById("character_xp"),
    "next_level": document.getElementById("next_level")
}

function refresh_page_stats() {
    character_stats.pics.src = "pics/" + level_description[level][1]
    character_stats.hp.innerHTML = stats.hp;
    character_stats.endurance.innerHTML = stats.endurance;
    character_stats.intelligence.innerHTML = stats.intelligence;
    character_stats.strength.innerHTML = stats.strength;
    character_stats.deffense.innerHTML = stats.deffense;
    character_stats.xp.innerHTML = stats.xp;
    character_stats.description.innerHTML = level_description[level][0];
    character_stats.next_level.innerHTML = 10;
    display_add_buttons();
}
refresh_page_stats();

function update_hp() {
    if (remaining_points > 0) {
        remaining_points--;
        stats.hp += 1;
        refresh_page_stats();
    }
}
function update_endurance() {
    if (remaining_points > 0) {
        remaining_points--;
        stats.endurance += 1;
        refresh_page_stats();
    }
}
function update_intelligence() {
    if (remaining_points > 0) {
        remaining_points--;
        stats.intelligence += 1;
        refresh_page_stats();
    }
}
function update_strength() {
    if (remaining_points > 0) {
        remaining_points--;
        stats.strength += 1;
        refresh_page_stats();
    }
}
function update_deffense() {
    if (remaining_points > 0) {
        remaining_points--;
        stats.deffense += 1;
        refresh_page_stats();
    }
}

function display_add_buttons() {
    let btns = document.getElementsByClassName("addButtons");
    if (remaining_points > 0) {
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display = "inline";
        }
    }
    else {
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display = "none";
        }
    }
}

function level_up() {
    if (level < level_description.length - 1) {
        remaining_points += 5;
        level++;
        refresh_page_stats();
    }
}


/*  ADVENTURE   */

let story = document.getElementById("story");

function rnd_szazalek() {
    return Math.floor(Math.random() * 100);
}

function collecting() {
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.deffense;

    if (sebzes_eselye <= 0) sebzes_eselye = 1;

    if (szazalek >= sebzes_eselye) {
        //sebződés
        //story.innerHTML += "You have collectid a stinger! (HP: -2)<br>";
        //stats.hp -= 2;

        fight("Royal Basilisk", 10, 2);

        refresh_page_stats();
    }
    else {
        //sikeres kaland
        story.innerHTML += "You have collected an XP! (XP: +1)<br>";
        stats.xp += 1;
        refresh_page_stats();
    }
}

function fight(enemy_name, enemy_hp, enemy_damage) {
    story.innerHTML = "A(n) " + enemy_name + " attacked you!<br>";

    // harc kimenetele: nyerünk, vesztünk, elmenekülünk (letelik 5 kör)
    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        story.innerHTML += "<br>__" + counter + ". round__<br>";

        if (enemy_attack) {
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.deffense;
            if (sebzes_eselye <= 0) sebzes_eselye = 1;

            if (szazalek >= sebzes_eselye) {
                //sikeres
                story.innerHTML += "The " + enemy_name + " bruised you! (-" + enemy_damage + " HP)<br>";
                stats.hp -= enemy_damage;
                refresh_page_stats();
            }
            else {
                //sikertelen
                story.innerHTML += "You have avoided the " + enemy_name + "'s attack!<br>";
            }
        }
        else {
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.endurance;

            if (sebzes_eselye >= 100) sebzes_eselye == 99;

            if (szazalek >= sebzes_eselye) {
                //sikeres
                story.innerHTML += "You have bruised the " + enemy_name + "! (-" + stats.strength + " HP)<br>";
                enemy_hp -= stats.strength;
                story.innerHTML += enemy_name + "'s HP: " + enemy_hp + "<br>";

            }
            else {
                //sikertelen
                story.innerHTML += "The " + enemy_name + " have avoided your attack!<br>";
            }
        }

        enemy_attack = !enemy_attack;   //váltogatja ki támad



    } while (stats.hp > 0 && enemy_hp > 0 && counter <= 10);
}