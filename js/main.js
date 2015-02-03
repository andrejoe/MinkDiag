/**
 * Created by erwin on 7/12/2014.
 */


init();


// Special Relativity gamma:
function srgamma(v) {
    var c = 1.0;
    return 1 / JXG.Math.pow((1 - (JXG.Math.pow(v, 2) / JXG.Math.pow(c, 2))), 0.5);
}

// Special Relativity gamma inverse:
function srgamma_inv(v) {
    var c = 1.0;
    return JXG.Math.pow((1 - (JXG.Math.pow(v, 2) / JXG.Math.pow(c, 2))), 0.5);
}



function init() {

    var board;
    var velocity; // fraction of c
    var test;
    test = 0;

    JXG.Options.text.useMathJax = true;

    board = JXG.JSXGraph.initBoard('box', {
        boundingbox: [-10, 10, 10, -10],
        axis: false,
        showCopyright: false,
        showNavigation: false,
        grid: false,
        keepaspectration: true
    });


    //var p1 = board.create('point', [0, 0], {showInfobox:true});
    //gamma(v)*(x-v*t)

    var v = 0.5;

    board.highlightInfobox = function(x, y, el) {

        v = sl1.Value() / 100.0;


        this.infobox.setText('<span style="color:blue;font-weight:bold">' +

            '(x , t ) ' + ': ' + (1.0/axis_scale * x).toPrecision(3) + ', ' + (1.0/axis_scale * y).toPrecision(3) + '<br>' +
            '(x\', t\') ' + ': ' + (1.0/axis_scale * srgamma(v) * (x - y * v)).toPrecision(3) + ', ' + (1.0/axis_scale *srgamma(v) * (y - v * x)).toPrecision(3)

            + '</span>');
        //this.infobox.rendNode.style.border = 'groove ' + el.visProp['strokeColor'] + ' 0px';
        //this.infobox.rendNode.style.padding = ' 5px';
        this.infobox.rendNode.style.margin = ' -18px';
        //this.infobox.rendNode.style.backgroundColor = 'white';
    }


    // Slider for velocity
    var sl1 = board.create('slider', [
        [-9, -9],
        [9, -9],
        [0, 50, 100]
    ]);

    var sl1_text = board.create('text', [0,-9.5, function(){ return "v = " + (sl1.Value() / 100.0).toFixed(2);} ] );





    var radius = 10.0;
    var axis_scale = 0.8; // Help to fit in withing the grid without mucking up our ranges.

    // For all axies both primed and not I will use gliders around the same circle
    // First we need an origin point
    var p0 = board.create('point', [0, 0], {
        name: "O",
        fixed: true,
        showInfobox: false,
        visible: false
    });
    // Around the orgin we want a circle for the gliders
    var c0 = board.create('circle', [p0, axis_scale * radius], {visible: false});
    // Following the wikipedia type presentation we will need 4 point/gliders to define the four axies
    // Each of these points will reside at the axis arrow head with 0 denoting unprimed and 1 denoting primed.

    var x0_head = board.create('glider', [1.0, 0.0, c0], {
        name: "\\({\\large x}\\)",
        fixed: true,
        showInfobox: false,
        opacity: 0,
        color: "white"
    });


    var t0_head = board.create('glider', [0.0, 1.0, c0], {
        name: "\\({\\large t}\\)",
        fixed: true,
        showInfobox: false,
        opacity: 0,
        color: "white"
    });



/*
    var x1_head = board.create('point', [function() {

        // Length contraction adjustment.
        //var l1 = radius * srgamma(sl1.Value() / 100.0);

        return axis_scale * radius *  Math.cos(Math.atan(sl1.Value() / 100.0));
    }, function() {

        // Length contraction adjustment.
        //var l1 = radius * srgamma(sl1.Value() / 100.0);

        return axis_scale * radius  * Math.sin(Math.atan(sl1.Value() / 100.0));
    }], {
        name: "\\({\\large x'}\\)",
        opacity: 0,
        color: "white"
    });
*/

    //var templine = board.create('arrow', [x0_tail, x0_head]);

   // var tmpline = board.create('perpendicular', [templine, x0_head]);


    var x1_head = board.create('point', [function() { 
        return x0_head.X();
    }, function() {
        return axis_scale * radius * (sl1.Value() / 100.0);    
    }
    ], {
        name: "\\({\\large x'}\\)",
        opacity: 0,
        color: "white"
    });


    var t1_head = board.create('point', [
        function() {            
            return axis_scale * radius * (sl1.Value() / 100.0);
        },
        function() {
            return t0_head.Y();
        }
    ], {
        name: "\\({\\large t'}\\)",
        opacity: 0,
        color: "white"
    });

    // Firstly lets get the point on the opposited side of the axies line segments

    var x0_tail = board.create('point', [function(){ return -x0_head.X();}, function(){return -x0_head.Y();}], {visible: false});
    var t0_tail = board.create('point', [function(){ return -t0_head.X();}, function(){return -t0_head.Y();}], {visible: false});

    var x1_tail = board.create('point', [function(){ return -x1_head.X();}, function(){return -x1_head.Y();}], {visible: false});
    var t1_tail = board.create('point', [function(){ return -t1_head.X();}, function(){return -t1_head.Y();}], {visible: false});
    


    // Now we can draw the line segments that make up the axies

    var x0_a = board.create('arrow', [x0_tail, x0_head], {color: "black"});
    var t0_a = board.create('arrow', [t0_tail, t0_head], {color: "black"});

    //var tk_x0 = board.create('ticks', [x0_a],                         {ticksDistance: 2, scale: srgamma_inv(sl1.Value() / 100.0)}    );

    //var tk_x0 = board.create('ticks', [x0_a],                         {ticksDistance: 2, scale: (t1_head.X() / 10.0) }    );


    //var tk_t0 = board.create('ticks', [t0_a], {ticksDistance: 2, scale:  function(){return srgamma_inv(sl1.Value() / 100.0);}() });


    var x1_a = board.create('arrow', [x1_tail, x1_head], {color: "blue"});
    var t1_a = board.create('arrow', [t1_tail, t1_head], {color: "blue"});

    //var tk_x1 = board.create('ticks', [x1_a], {ticksDistance: 2});
    //var tk_t1 = board.create('ticks', [t1_a], {ticksDistance: 2});


    //----------------------------------


    //======================================
/*
    var parts0 = 10;
    var top_point0, bot_point0;

    for(i = -parts0; i < parts0 + 1; i++){

        top_point0 = board.create('point', [radius * axis_scale * 1.0 / parts0 * i,  radius * axis_scale],  {visible: false}); 
        bot_point0 = board.create('point', [radius * axis_scale * 1.0 / parts0 * i, -radius * axis_scale], {visible: false});
        board.create('segment', [top_point0, bot_point0], {dash: false, strokeWidth: 0.2, fixed: true, highlight: false}); 
        
        lft_point0 = board.create('point', [-radius * axis_scale, radius * axis_scale * 1.0 / parts0 * i],  {visible: false}); 
        rit_point0 = board.create('point', [radius * axis_scale, radius * axis_scale * 1.0 / parts0 * i], {visible: false});
        board.create('segment', [lft_point0, rit_point0], {dash: false, strokeWidth: 0.1, fixed: true, highlight: false}); 

    }
*/

/*
    var parts1 = 10;
    var top_point1 = [];
    var bot_point1 = [];
    var lft_point1 = [];
    var rit_point1 = [];
    var cnt = [];
*/
    //board.suspendUpdate();


//    for(j = -parts1; j < parts1 + 1; j++){

  //      cnt[j] = j;
/*
    top_point1[j] = board.create('point', [function() { return   axis_scale * radius * ((cnt[j] / parts1 ) + (sl1.Value() / 100.0));}, radius * axis_scale], {visible: true});
    bot_point1[j] = board.create('point', [function() { return   -axis_scale * radius * ((-cnt[j] / parts1 ) + (sl1.Value() / 100.0));}, -radius * axis_scale], {visible: true});
*/
 //  board.create('point', [function(x,y) { return    (sl1.Value() / 100.0) + x;  }, 6.0], {visible: true, style:4});
   //board.create('point', [function() { return   -axis_scale * radius * ((-cnt[j] / parts1 ) + (sl1.Value() / 100.0));}, -radius * axis_scale], {visible: true, style:4});



    //board.create('segment', [top_point1[j], bot_point1[j]], {dash: false, strokeWidth: 0.2, fixed: true, highlight: false}); 

    //lft_point1[j] = board.create('point', [radius * axis_scale, function() { return   axis_scale * radius * ((1.0 / parts1 * j) + (sl1.Value() / 100.0));}], {visible: false});
    //rit_point1[j] = board.create('point', [-radius * axis_scale, function() { return   -axis_scale * radius * ((-1.0 / parts1 * j) + (sl1.Value() / 100.0));}], {visible: false});
    //board.create('segment', [lft_point1[j], rit_point1[j]], {dash: false, strokeWidth: 0.2, fixed: true, highlight: false}); 

    //}
    //board.unsuspendUpdate();










//---------------------------------------------------------------------------------------------------------------------
// Horozontal and Vertical "Non Primed" grid: (I only dropped the velocity dependance from the Primed grid).
// There proabably is a cleaner way to do this.
var i, j;
var parts = 10; // Grid resolution.

i = 0
for (j=-parts; j<parts+1; j++){
  board.create('segment',
[
    [function(x,y){ return function(){ return -axis_scale *radius; };}(i,j), 
    function(x,y){ return function(){ return axis_scale * radius * ( (y/parts)  );};}(i,j), ], 

    [function(x,y){ return function(){ return axis_scale * radius;};}(i,j), 
    function(x,y){ return function(){ return   axis_scale * radius * ( (y/parts)  );};}(i,j) ], 
],
       {fixed: true, highlight: false, strokeWidth: 0.1, strokeColor: "#000066"});
}

j = 0
for (i=-parts; i<parts+1; i++){
  board.create('segment',
[
    [function(x,y){ return function(){ return axis_scale * radius * ( (x/parts)  );};}(i,j), 
    function(x,y){ return function(){ return -axis_scale *radius; };}(i,j)], 

    [function(x,y){ return function(){ return axis_scale * radius * ( (x/parts)  );};}(i,j), 
     function(x,y){ return function(){ return axis_scale *radius;};}(i,j)], 
],
       {fixed: true, highlight: false, strokeWidth: 0.1, strokeColor: "#000066"});
}

//---------------------------------------------------------------------------------------------------------------------




//---------------------------------------------------------------------------------------------------------------------
// Horozontal and Vertical "Primed" grid:
var i, j;
var parts = 10; // Grid resolution.

i = 0
for (j=-parts; j<parts+1; j++){
  board.create('segment',
[
    [function(x,y){ return function(){ return -axis_scale *radius; };}(i,j), 
    function(x,y){ return function(){ return axis_scale * radius * ( (y/parts) - (sl1.Value() / 100.0) );};}(i,j), ], 

    [function(x,y){ return function(){ return axis_scale * radius;};}(i,j), 
    function(x,y){ return function(){ return   axis_scale * radius * ( (y/parts) + (sl1.Value() / 100.0) );};}(i,j) ], 
],
       {fixed: true, highlight: false, strokeWidth: 0.1, strokeColor: "#660000"});
}

j = 0
for (i=-parts; i<parts+1; i++){
  board.create('segment',
[
    [function(x,y){ return function(){ return axis_scale * radius * ( (x/parts) - (sl1.Value() / 100.0) );};}(i,j), 
    function(x,y){ return function(){ return -axis_scale *radius; };}(i,j)], 

    [function(x,y){ return function(){ return axis_scale * radius * ( (x/parts) + (sl1.Value() / 100.0) );};}(i,j), 
     function(x,y){ return function(){ return axis_scale *radius;};}(i,j)], 
],
       {fixed: true, highlight: false, strokeWidth: 0.1, strokeColor: "#660000"});
}

//---------------------------------------------------------------------------------------------------------------------



//brd.unsuspendUpdate();

    //======================================


    //var testline = board.create('line', [[2.0, 3.3], [3.6, 5.0]] );



    //!!!!!!!!!!!!!!!!!!!!!!!!!

    var x0_line = board.create('line', [x0_tail, x0_head], {strokeColor: "gray", strokeWidth: 0.2, dash: true});
    var x1_line = board.create('line', [x1_tail, x1_head], {strokeColor: "gray", strokeWidth: 0.2, dash: true});

    var t0_line = board.create('line', [t0_tail, t0_head], {strokeColor: "gray", strokeWidth: 0.2, dash: true});
    var t1_line = board.create('line', [t1_tail, t1_head], {strokeColor: "gray", strokeWidth: 0.2, dash: true});



    //board.create('perpendicularsegment', [[x1_tail, x1_head], [2.0, 1.0]])


    //!!!!!!!!!!!!!!!!!!!!!!!!!




    //----------------------------------

    // While here we can add the angles on top of the primed/not primed axies

    var a0 = board.create('angle', [t1_head, p0, t0_head], {name: "\\(\\theta\\)", radius:1.4});
    var a1 = board.create('angle', [x0_head, p0, x1_head], {name: "\\(\\theta\\)", radius:1.4});

    // Ok now lets put down a single event and see if that will be enough
    var evp0 = board.create('point', [2,5], {name:"\\( evt_0\\)", color: "green"});

    var par_x0 = board.create('parallel', [x0_a, evp0], {visible: false} );
    var par_t0 = board.create('parallel', [t0_a, evp0], {visible: false} );
    // now we need the interesction of this line and the t0 axis
    var ints_par_x0 = board.create('intersection', [par_x0, t0_a], {visible: false});
    var ints_par_t0 = board.create('intersection', [par_t0, x0_a], {visible: false});
    // now we can draw a line from the event point to the t0 axis
    var evp0_ln0 = board.create('arrow', [evp0, ints_par_x0], {color: "green", strokeWidth: 1, dash: true});
    var evp0_ln1 = board.create('arrow', [evp0, ints_par_t0], {color: "green", strokeWidth: 1, dash: true});

    // Now similarly using the primed axis (but the same event)
    var evp0_par_x1 = board.create('parallel', [x1_a, evp0], {visible: false} );
    var evp0_par_t1 = board.create('parallel', [t1_a, evp0], {visible: false} );
    // now we need the interesction of this line and the t0 axis
    var evp0_ints_par_x1 = board.create('intersection', [evp0_par_x1, t1_a], {visible: false});
    var evp0_ints_par_t1 = board.create('intersection', [evp0_par_t1, x1_a], {visible: false});
    // now we can draw a line from the event point to the t0 axis
    var evp0_ln2 = board.create('arrow', [evp0, evp0_ints_par_x1], {color: "green", strokeWidth: 1, dash: true});
    var evp0_ln3 = board.create('arrow', [evp0, evp0_ints_par_t1], {color: "green", strokeWidth: 1, dash: true});


//-------------------------

 // Ok now lets put down a single event and see if that will be enough
    var evp1 = board.create('point', [3,5], {name:"\\( evt_1\\)", color: "red"});

    var par_x1 = board.create('parallel', [x0_a, evp1], {visible: false} );
    var par_t1 = board.create('parallel', [t0_a, evp1], {visible: false} );
    // now we need the interesction of this line and the t0 axis
    var ints_par_x1 = board.create('intersection', [par_x1, t0_a], {visible: false});
    var ints_par_t1 = board.create('intersection', [par_t1, x0_a], {visible: false});
    // now we can draw a line from the event point to the t0 axis
    var evp1_ln0 = board.create('arrow', [evp1, ints_par_x1], {color: "red", strokeWidth: 1, dash: true});
    var evp1_ln1 = board.create('arrow', [evp1, ints_par_t1], {color: "red", strokeWidth: 1, dash: true});

    // Now similarly using the primed axis (but the same event)
    var evp1_par_x1 = board.create('parallel', [x1_a, evp1], {visible: false} );
    var evp1_par_t1 = board.create('parallel', [t1_a, evp1], {visible: false} );
    // now we need the interesction of this line and the t0 axis
    var evp1_ints_par_x1 = board.create('intersection', [evp1_par_x1, t1_a], {visible: false});
    var evp1_ints_par_t1 = board.create('intersection', [evp1_par_t1, x1_a], {visible: false});
    // now we can draw a line from the event point to the t0 axis
    var evp1_ln2 = board.create('arrow', [evp1, evp1_ints_par_x1], {color: "red", strokeWidth: 1, dash: true});
    var evp1_ln3 = board.create('arrow', [evp1, evp1_ints_par_t1], {color: "red", strokeWidth: 1, dash: true});



}
