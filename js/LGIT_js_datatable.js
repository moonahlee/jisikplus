

$(document).ready(function() {
    
    /* Datatable simple */
    $('#datatable').DataTable({
        pagingType: 'full_numbers',
        searching : false,               
        language: {
            searchPlaceholder: 'Search'
        },   
        lengthMenu: [5, 10, 15, 20, 25],     //보여주는 table line 변경 할 수 있습니다. lengthMenu를 삭제하면 default로 나옵니다.
        order: [],     //현재 sort가 하나도 안되었을 때 경우 입니다. 특정컬럼을 sort 하고 싶을 경우에는 order:[3, 'desc'] 이렇게 써주시면 됩니다.( desc: 내림차순, asc :오름차순) 
        dom: 'Rlfrtip'
    });
    /* Datatable with sum */
    $('#datatable_sum').DataTable({
        pagingType: 'full_numbers',
        searching : false,
        order: [],
        language: {
            searchPlaceholder: 'Search'
        },
        footerCallback: function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // Total over all pages
            total = api
                .column( 5 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                } );
 
            // Total over this page
            pageTotal = api
                .column( 5, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );
 
            // Update footer
            $( api.column( 5 ).footer() ).html(
                '$'+pageTotal + ' ($'+ total +' total)'
            );
        }
    });
	/* Datatable with scroll */
    $('#datatable_scroll').DataTable({
        language: {
            searchPlaceholder: 'Search'
        },
        searching : false,
        scrollX: true,
        scrollY: '300px',
        scrollCollapse: true,
        dom: 'Rlfrtip',
        paging: false
    });
   
	/* Datatable cell edit */
    $('#datatable_cellEdit').DataTable({
        pagingType: "full_numbers",
        language: {
            searchPlaceholder: 'Search'
        },
        searching : false,
        bSort: false,
        dom: 'Rlfrtip',
        fnCreatedRow: function( nRow, aData, iDataIndex ) {
            $('td:eq(6)', nRow).html(
                '<button class="btn btn-grey btn-sm btn-remove"><span class="glyphicon glyphicon-trash"></span></button><button class="btn btn-grey btn-sm btn-edit"><span class="glyphicon glyphicon-pencil"></span></button>'
            );
        }
    });
    /* Datatable column edit */
    $('#datatable_colEdit').DataTable({
        pagingType: 'full_numbers',
        language: {
            searchPlaceholder: 'Search'
        },
        searching : false,
        dom: 'Rlfrtip'
    });
    
    $('#datatable_colEdit02').DataTable({
        pagingType: 'full_numbers',
        language: {
            searchPlaceholder: 'Search'
        },
        searching : false,
        dom: 'Rlfrtip'
    });
    
    $("#datatable_cellEdit").on('click', '.btn-remove', function() {
        var $tr = $(this).closest('tr');
        $tr.removeClass('row-edit');
        if($tr.hasClass('row-new')){
            $tr.remove();
            return;
        }
        if ( $tr.hasClass('row-remove') ) {
            $tr.removeClass('row-remove');
        } else {
            $tr.addClass('row-remove');
        }
    });

    $("#datatable_cellEdit").on('click', '.btn-edit', function() {
        var $tr = $(this).closest('tr');
        $tr.removeClass('row-remove');
        if ( $tr.hasClass('row-edit') ) {
            $tr.removeClass('row-edit');
        } else {
            $tr.addClass('row-edit');
        }
    });
    
});
