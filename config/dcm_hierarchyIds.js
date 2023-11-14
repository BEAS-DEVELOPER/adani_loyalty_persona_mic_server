
const hirarchyIds =[

    {  id : 1  , name : 'Contractor' , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 2  , name : 'TSO'        , selfReg : false ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 3  , name : 'Dealer'     , selfReg : false ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 4  , name : 'Interior'   , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 5  , name : 'Engineer'   , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 6  , name : 'Architect'  , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 7  , name : 'Designers'  , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },

]


module.exports = hirarchyIds