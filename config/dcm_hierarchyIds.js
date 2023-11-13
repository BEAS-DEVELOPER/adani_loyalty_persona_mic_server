
const hirarchyIds =[

    {  id : 1  , name : 'Contractor' , selfReg : true  , canRegBy : [{id:2,name:'TSO'},{id:3,name:'Dealer'}]  },
    {  id : 2  , name : 'TSO'        , selfReg : true  , canRegBy : [{}]  },
    {  id : 3  , name : 'Dealer'     , selfReg : false , canRegBy : [{}]  },
    {  id : 4  , name : 'Influencer'   , selfReg : false , canRegBy : [{}]  },
    // {  id : 4  , name : 'Sales Force', selfReg : false , canRegBy : [{}]  },
    // {  id : 5  , name : 'Interior'   , selfReg : false , canRegBy : [{id:9,name:'TSO'},{id:2,name:'Dealer'}]  },
    // {  id : 6  , name : 'Engineer'   , selfReg : false , canRegBy : [{}]  },
    // {  id : 7  , name : 'Architect'  , selfReg : true  , canRegBy : [{}]  },
    // {  id : 8  , name : 'Designers'  , selfReg : true  , canRegBy : [{}]  },

]


module.exports = hirarchyIds