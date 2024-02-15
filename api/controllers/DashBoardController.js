import { getDashBoardData } from "../service/dashboardDataService.js"

export const getDashboardInfo = async(req,res,next)=>{
    try {
        const DBInfo = await getDashBoardData();
        res.status(200).json({DBInfo});
    } catch (error) {
        next(error)
    }
}