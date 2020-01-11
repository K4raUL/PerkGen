var chars = 0
var perks = 0
var isON = '1px solid black'
var isOFF = '1px solid white'

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function init() {
    perks = document.cookie
    alert(perks)
    for (var i = 0; i < perks.length; i++) if (perks[i] == '1') setON(i)
}

function generate() {
    // save perks to browser cookie
    document.cookie = perks;
        
    clearRes()
    prk = dec2bin(perks)
    
    var nums = []
    for (var i = 0; i < prk.length; i++) if (prk[i] == '1') nums.push(prk.length-1-i)
    
    var iter = 0
    while (iter < 4) {
        if (!(Array.isArray(nums) && nums.length)) return
        iter++
        var randi = randomInt(0, nums.length)

        var res = document.getElementById(-100*iter)
        var srci = document.getElementById(nums[randi].toString())
        res.src = srci.childNodes[0].src
        res.title = srci.title
        
        nums.splice(randi, 1)
    }
}

function clearRes() {
    document.getElementById('-100').src = "backg.png"
    document.getElementById('-100').title = ""
    document.getElementById('-200').src = "backg.png"
    document.getElementById('-200').title = ""
    document.getElementById('-300').src = "backg.png"
    document.getElementById('-300').title = ""
    document.getElementById('-400').src = "backg.png"
    document.getElementById('-400').title = ""
}

function charac(oid) {
    chars ^= 1 << oid
    stl0 = document.getElementById(oid).style
    
    if (oid == -21) {
        if (chars & (1 << oid)) {
            stl0.border = isON
            stl0.opacity = '1'
            stl0.fontWeight = 'bold'
        
            for (var i = 60; i < 74; i++) setON(i)
        }
        else {
            stl0.border = isOFF
            stl0.opacity = '0.5'
            stl0.fontWeight = ''  
            
            for (var i = 60; i < 74; i++) setOFF(i)
        }
        return
    }
    
	var num = Math.abs(oid) - 1
    num *= 3

    if (chars & (1 << oid)) {
        stl0.border = isON
        stl0.opacity = '1'
        stl0.fontWeight = 'bold'
        
        setON(num)
        setON(num+1)
        setON(num+2)
    }
    else {
        stl0.border = isOFF
        stl0.opacity = '0.5'
        stl0.fontWeight = ''
     
        setOFF(num)
        setOFF(num+1)
        setOFF(num+2)
    }    
}

function perk(oid) {
    if (perks & (1 << oid)) setOFF(oid)
    else setON(oid)
}

function setON(id) {
    perks |= 1 << id
    var stl = document.getElementById(id).style
    
    stl.border = isON
    stl.opacity = '1'    
}

function setOFF(id) {
    perks &= ~(1 << id)
    var stl = document.getElementById(id).style
    
    stl.border = isOFF
    stl.opacity = '0.5'    
}
