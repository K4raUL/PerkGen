var chars = [1, 1, 1, 1, 1, 0, 0, 1, 0, 1,]
var perks = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,]
var stats = []
var sum = 22
var isON = '1px solid black'
var isOFF = '1px solid white'

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function setCookie(variable, value, expires_days) {
    var d = new Date();
    d = new Date(d.getTime() + 1000 * expires_days * 60 * 60 * 24);
    document.cookie = variable + '=' + value + '; expires=' + d.toGMTString() + ';';
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length).split(',');
    }
  }
  return "";
}

function init() {
    // reading statistics from cookies
    stats = getCookie("stats")
    alert(document.cookie)
    if (!stats) stats = []
    
    //perks = getCookie("perks")
    for (var i = 0; i < perks.length; i++) if (perks[i] == '1') setON(i)

    //chars = getCookie("chars")
    for (var i = 0; i < chars.length; i++) if (chars[i] == '1') {
        charid = -(i+1)      // ????
        stl0 = document.getElementById(charid).style        
        
        stl0.border = isON
        stl0.opacity = '1'
        stl0.fontWeight = 'bold'
    }
    
    charac(-13)
    charac(-14)
    charac(-16)
    charac(-21)
}

function generate() {
    // save perks to browser cookie
    //document.cookie = "perks=" + perks
        
    clearRes()
    
    var nums = []
    for (var i = 0; i < perks.length; i++) if (perks[i] == '1') nums.push(i)

    var iter = 0
    while (iter < 4) {
        if (!(Array.isArray(nums) && nums.length)) return
        iter++
        
        // random position in valid perks list
        var randi = randomInt(0, nums.length)
        var rid = nums[randi]                                   // html id of new random perk

        var res = document.getElementById(-100*iter)
        var srci = document.getElementById(rid.toString())
        res.src = srci.childNodes[0].src
        res.title = srci.title
        
        // saving statistics
        if (stats[rid] == undefined) stats[rid] = 1
        else stats[rid]++
        
        // displaying statistics
	alert(stats[rid])
        document.getElementById("res" + iter).innerHTML = stats[rid]
        
        // erasing perk from list (preventing same perk appearing in the result)
        nums.splice(randi, 1)
    }
    
    // saving stats into cookies
    setCookie("stats", stats, 365);
    //alert(document.cookie)
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
    var num = Math.abs(oid) - 1
    
    if (chars[num] != '1') chars[num] = '1'
    else chars[num] = '0'

    stl0 = document.getElementById(oid).style
    
    if (num == 20) {
        if (chars[num] == '1') {
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
  
    if (chars[num] == '1') {
        stl0.border = isON
        stl0.opacity = '1'
        stl0.fontWeight = 'bold'
        
        setON(3*num)
        setON(3*num+1)
        setON(3*num+2)
    }
    else {
        stl0.border = isOFF
        stl0.opacity = '0.5'
        stl0.fontWeight = ''
     
        setOFF(3*num)
        setOFF(3*num+1)
        setOFF(3*num+2)
    }    
}

function perk(oid) {
    if (perks[oid] == '1') setOFF(oid)
    else setON(oid)
}

function setON(id) {
    if (perks[id] != '1') {
        sum++
        perks[id] = '1'
    }
    
    document.getElementById("rollbtn").innerHTML = "Roll (" + sum + ")"
    var stl = document.getElementById(id).style
    stl.border = isON
    stl.opacity = '1'    
}

function setOFF(id) {
    if (perks[id] == '1') {
        sum--
        perks[id] = '0'
    }

    document.getElementById("rollbtn").innerHTML = "Roll (" + sum + ")"
    var stl = document.getElementById(id).style    
    stl.border = isOFF
    stl.opacity = '0.5'    
}
