const Job = require('../models/Job');
require('dotenv').config();

exports.createJob = async (req, res) => {
    try {
        const { companyName, logoUrl, title, description } = req.body;

        if (!companyName || !logoUrl || !title || !description) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        jobDetails = new Job({
            companyName,
            logoUrl,
            title,
            description,
            refUserId: req.body.userId,
        });

        await jobDetails.save();

        res.json({ message: "New job created successfully" });

    } catch (error) {
        console.log(error);
    }
}


exports.editJob = async (req, res) => {
    try {
        const { companyName, logoUrl, title, description } = req.body;
        const jobId = req.params.jobId;

        if (!companyName || !logoUrl || !title || !description || !jobId) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Job.updateOne(
            { _id: jobId },
            {
                $set: {
                    companyName,
                    logoUrl,
                    title,
                    description,
                },
            }
        );



        res.json({ message: "job details updated successfully" });

    } catch (error) {
        console.log(error);
    }
}

exports.job_description = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        // to get all description
        const jobDetails = await Job.findById(jobId);


        // by above ,we will get all details, for companyName only or other feild

        // const jobDetails=await Job.findById(jobId,{
        //     companyName:1,
        //     title:1,
        // });

        res.json({ data: jobDetails });

    } catch (error) {
        console.log(error);
    }
}

exports.allJob = async (req, res) => {
    try {

        // const jobList=await Job.find({});

        // for only companyName and title
        // first parameter is filter
        // const jobList = await Job.find(
        //     {},
        //     {
        //         companyName: 1,
        //         title: 1,
        //     }
        // );

        // for title only software developer,this title is for match
        // const jobList=await Job.find(
        //     {title:"software developer"},
        //     {companyName:1}
        // );

        // above is for exact software developer,what if user type only developer,then use regular expression to handle
        // here i means case insensitive
        const title=req.query.title||"";
        // const skills=req.query.skills||[];
        const skills=req.query.skills||"";

        // console.log(typeof skills);
        // console.log(typeof JSON.parse(skills));

        // now we are getting ,so convert into comma seprated value
        const filterSkills=skills.split(",");

        // here instead of const ,we have to use let because completely we are giving new object in filter
        let filter={};

        if(skills.length>0){
            filter={ skills: {$in : [...filterSkills] } };
        }

        const jobList=await Job.find(
            {
                // here we are giving two filter,and here ',' comma works as a and clause,thats why its running,in skills it is taking empty array
                title: {$regex: title, $options: "i"},
                // skills:{ $in: [...skills] },
                // this above is not working here
                ...filter,
            },
            // {companyName:1}
        );

        // add filter in the find query with skills,homework
        // ["html","css","js"] this is skill should be saved in database document

        res.json({data:jobList});
    } catch (error) {
        console.log(error);
    }
}

exports.deleteJob=async (req,res)=>{
    try{
       const title=req.query.title||"";
       const jobList=await Job.deleteById(jobId);


       res.json({data:jobList});
    }catch(error){
        console.log(error);
    }
}