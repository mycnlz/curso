/*--------------------
Basic Calculator
---------------------*/
  
var $scr = $('.screen'); // screen element
var opr = ['+', '-', 'x', '÷']; // operators
var memo = []; // memory list
var hasOperator = false; // solves the expression when there is already an operator
var hasErrorMsg = false; // check if error message is presenting

$('.calc button').click(function(){
  
  var btn = $(this).data('v'); // button value
  var out = $scr.html(); // screen output
  
  if( hasErrorMsg ){
    // if error message is presenting, clear output first
    out = '';
    hasErrorMsg = false;
  };
  
  if( !hasErrorMsg ){
    if( $(this).parent().is('.operators') ){
      // operator button clicked
      
      if( btn == '%' ){
        // '%' button clicked
        if( hasOperator ){
          var last = out[out.length - 1]; // get last character
          if( out.length > 1 && opr.indexOf(last) > -1 ){
            // if last character is an operator, remove it
            $scr.html(out.replace(/.$/, ''));
          } else {
            out += btn;
          }
          
          var lfir = 0, lope = 0, lsec = 0; // positions inside equation
          var lper = out.toString().indexOf(btn); // position of '%' inside equation
          var sfir = 0, sope = 0, ssec = 0; // final values inside equation
          
          for( var o = 0; o < opr.length; o++ ){
            // find the operator used in equation and its location
            var n = out.toString().indexOf(opr[o].toString());
            if( n > -1 ){
              lope = n;
              sope = opr[o];
              sope = sope.replace(/x/g, '*').replace(/÷/g, '/');
            }
          }
          
          // solves the percentage and rebuilds the equation
          sfir = out.substring(0, lope);
          lsec = (lope + 1);
          ssec = out.substring(lsec, lper);
          var resPer = (sfir * (ssec / 100));
          
          
          $scr.html(eval(sfir + sope + resPer));
          hasOperator = false;
        }
      }
      
      if( hasOperator || btn == '=' ){
        // '='(equal) button clicked
        var last = out[out.length - 1]; // get last character
        out = out.replace(/x/g, '*').replace(/÷/g, '/'); // replace operators for JS

        if( last == '.' || opr.indexOf(last) > -1 ){
            out = out.replace(/.$/, ''); // fix decimal places
        }

        $scr.html(eval(out));
        hasOperator = false;
      }
      
      if( btn != '=' && btn != '%' ){
        // other operator button clicked
        var last = out[out.length - 1]; // get last character
        hasOperator = true;
        
        if( out != '' && opr.indexOf(last) == -1 ){
          // ok, add operator to this equation and print
          if( eval(out) != out){ addMemo(out, eval(out)); }
          $scr.html(eval(out) + btn);
          
        } else if ( out == '' && btn == '-'){
          // exception when is '-', where minus turns a negative symbol
          hasOperator = false;
          $scr.html(out + btn);
        }

        if( out.length > 1 && opr.indexOf(last) > -1 ){
          // replace operator
          $scr.html(out.replace(/.$/, btn));
        }
      }
    } else if( btn == '.' ){
      // '.'(decimal separator) button clicked
      $scr.html(out + btn);

    } else if( btn == 'C' ) {
      // 'C'(clear) button clicked
      $scr.html('');
      hasErrorMsg = false;

    } else {
      // number button clicked
      $scr.html(out + btn);
    }
  }
  
  if( $scr.html().length > 12) {
    if( $scr.html().length > 17) {
      // present long number error message 
      $scr.html('too long! :o');
      hasErrorMsg = true;
    } else {
      // regular font size
      $scr.css('padding', '26px');
      $scr.css('font-size', '32px');
    }
  } else {
    // decrease font size to fit on screen
    $scr.css('padding', '18px');
    $scr.css('font-size', '48px');
  }
});

$('.memo').on('click', 'button', function() {
  var btn = $(this).data('v'); // button value
  $scr.html(btn);
});

function addMemo(equation, results){
  equation = equation.replace('*', 'x').replace('/', '÷'); // replace operators for screen
  var item = "<li><button data-v='" + equation + "'>" + equation + "</button><span class='ion-ios-arrow-thin-right'></span><button data-v='" + results + "'>" + results + "</button></li>";
  memo.unshift(item);
  
  if( memo.length > 10 ){ memo.pop(); }
  
  $('ul.memo').html('');
  for( line in memo ){
    $('ul.memo').html($('ul.memo').html() + memo[line] );
  }
};

