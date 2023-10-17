
const moduleData = (reqData , resData  ) => {
  if(reqData){
    let moduleData=reqData;
    let moduleList = []
    moduleData.forEach((module) => {
        
            if(module.moduleName == "Admin"){
                moduleList.push({
                mPId:module.id,
                moduleId:module.moduleId,
                name:module.moduleName,
                IconUrl:"./assets/Icons/admin.png"
                })
            }
            //=======
            if(module.moduleName == "Common"){
                moduleList.push({
                mPId:module.id,
                moduleId:module.moduleId,
                name:module.moduleName,
                IconUrl:"./assets/Icons/common.png"
                })
            }
            //========
            // if(module.moduleName == "Supplier"){
            //     moduleList.push({
            //     mPId:module.id,
            //     moduleId:module.moduleId,
            //     name:module.moduleName,
            //     IconUrl:"./assets/Icons/supplier.png"
            //     })
            // }
            //========
            // if(module.moduleName == "Delivery"){
            //     moduleList.push({
            //     mPId:module.id,
            //     moduleId:module.moduleId,
            //     name:module.moduleName,
            //     IconUrl:"./assets/Icons/delivery.png"
            //     })
            // }
            //========
            // if(module.moduleName == "Catalogue"){
            //     moduleList.push({
            //     mPId:module.id,
            //     moduleId:module.moduleId,
            //     name:module.moduleName,
            //     IconUrl:"./assets/Icons/catalogue.png"
            //     })
            // }
        })
           resData(null , moduleList )
  } else {
        resData("not found" , null)
  }
       //let moduleList = res

}
module.exports = moduleData;