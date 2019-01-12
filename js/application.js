        var updateSubtotal = function (ele) {
            var unitCost = parseFloat($(ele).find('.cost').text());
            var unitQuantity = parseFloat($(ele).find('.quantity input').val());

            // subtotal is unitCost times unitQuantity
            var subtotal1 = 0;
        
            subtotal1 = unitCost * unitQuantity;
            
            if(isNaN(subtotal1)) {
                subtotal1 = 0;
            }
               
            $(ele).children('.subTotal').html("$"+subtotal1);

            return subtotal1;
        }

        var sum = function(acc, x) { return acc + x; };

        var updateTotalCost = function () {
            var totalCost = [];                
            
            $('tbody tr').each(function (i, ele) {
              var subTotal1 = updateSubtotal(ele);
              totalCost.push(subTotal1);
              if(isNaN(totalCost[i])) {
                totalCost[i] = 0;
               }  
            });
            
            for(var i = 0; i<totalCost.length; i++){
                if(isNaN(totalCost[i])) {
                    totalCost[i] = 0;
               }  
            }

            var total1 = 0;
            total1 = totalCost.reduce(sum);
            
            $('#totalValue').text(total1);
        }

        //added
        $(document).on('submit', '#addProduct', function (event) {
          event.preventDefault();
          var product = $(this).children('[name=product]').val();
          var cost = $(this).children('[name=cost]').val();        
                    
          $('tbody').prepend('<tr>' +
              '<td class="product align-middle">' + product + '</td>' +
              '<td class="align-middle text-center">$<span class="cost">' + cost +'.00'+ '</span></td>' +
              '<td class="align-middle text-center quantity"><label>QTY</label>' +
              '<input class="" type="number"/></td>' +
              '<td class="align-middle text-center"><button class="btn btn-secondary btn-sm remove">Remove</button></td>' +
              '<td class="subTotal align-middle text-center" >0</td>');
 

          updateTotalCost();
          $(this).children('[name=product]').val('');
          $(this).children('[name=cost]').val('');
        });

        $(document).ready(function () {
          updateTotalCost();

          $(document).on('click', '.btn.remove', function (event) {
            $(this).closest('tr').remove();

             updateTotalCost();
          });

          var timeout;
          $(document).on('input', 'tr input', function () {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              updateTotalCost();
            }, 500);
          });
        });       
