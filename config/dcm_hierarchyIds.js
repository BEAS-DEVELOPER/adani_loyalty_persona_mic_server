
const hirarchyIds =[

    // ORGANIZATION_ID : 1 ACC

    {  id : 1  , organizationId:1 , name : 'Contractor' , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 2  , organizationId:1 , name : 'TSO' ,        selfReg : false ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 3  , organizationId:1 , name : 'Dealer' ,     selfReg : false ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 4  , organizationId:1 , name : 'Interior Designers'   , selfReg : true  ,    canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 5  , organizationId:1 , name : 'Engineer'   , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },
    {  id : 6  , organizationId:1 , name : 'Architect'  , selfReg : true  ,   canRegBy   : [ { id:2, name:'TSO' }, { id:3, name:'Dealer' }]  },

    // ORGANIZATION_ID : 2 AMBUJA
    
    {  id : 7  , organizationId:2 , name : 'Architect'  , selfReg : true  ,   canRegBy   : [ { id:11, name:'TSO' }, { id:10, name:'Dealer' }]  },
    {  id : 8  , organizationId:2 , name : 'Engineer'   , selfReg : true  ,   canRegBy   : [ { id:11, name:'TSO' }, { id:10, name:'Dealer' }]  },
    {  id : 9  , organizationId:2 , name : 'Interior Designers'   , selfReg : true  ,   canRegBy   : [ { id:11, name:'TSO' }, { id:10, name:'Dealer' }]  },
    {  id : 10 , organizationId:2 , name : 'Dealer' ,     selfReg : false ,   canRegBy   : [ { id:11, name:'TSO' }, { id:10, name:'Dealer' }]  },
    {  id : 11 , organizationId:2 , name : 'TSO' ,        selfReg : false ,   canRegBy   : [ { id:11, name:'TSO' }, { id:10, name:'Dealer' }]  },
    {  id : 12 , organizationId:2 , name : 'Contractor' , selfReg : true  ,   canRegBy   : [ { id:11, name:'TSO' }, { id:10, name:'Dealer' }]  },

]

module.exports = hirarchyIds