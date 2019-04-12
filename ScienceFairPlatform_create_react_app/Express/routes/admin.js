var express = require('express')
const request = require('request')
const User = require('../Model/usermodel');
const Judge = require('../Model/judgemodel');
const Project = require('../Model/projectmodel');
const Project_Score = require('../Model/project_scoremodel')
const Admin = require('../Model/adminmodel')
const router = express.Router()
//##################################### DELETE JUDGE #####################################################

router.post('/deletejudge', async (req, res) => 
{
    console.log("got the body" , req.body);
    const { name, login_email } = req.body
    console.log("name and email", name ,login_email);
    
    const judgeId = await Judge.findOne(
        { $and: [{ name: name }, { login_email: login_email }] },
        {_id: 1,}
    );
    console.log("judgeId",judgeId)
    if(judgeId)
    {
        console.log("judgeId found",judgeId._id);
        const projects =await Project.find(
            { $or: [{ judge_id_1:judgeId }, { judge_id_2: judgeId }] },
            { _id: 1,
            project_id:1,
            judge_id_1:1,
            judge_id_2:1,
            assigned_count:1,
            }
        );
        console.log("projects", projects) 
        if(projects)
        {
                async function asyncForEach(
                    array,
                    callback
                ) {
                    for (
                        let index = 0;
                        index <
                        array.length;
                        index++
                    ) {
                        await callback(
                            array[index],
                            index,
                            array
                        );
                    }
                }
            await asyncForEach(
                projects,
                async arrayItem => {
                    try {
                        let updateValues={};
                        console.log("judge id", judgeId);
                        console.log("arrayitem", arrayItem.judge_id_1);
                            if(judgeId._id == arrayItem.judge_id_1 )
                            {
                                console.log("found in 1")
                                updateValues.judge_id_1 = null;
                            }
                            else{
                                if(judgeId._id == arrayItem.judge_id_2 )
                                {
                                    console.log("found in 2")
                                updateValues.judge_id_2 = null;  
                                }
                            }
                        updateValues.assigned_count = arrayItem.assigned_count - 1
                        console.log("updated list", updateValues);
                        await Project.updateOne(
                            {
                                _id:
                                    arrayItem._id,
                            },
                            {
                                $set: updateValues,
                            }
                        ).then(affected => {
                            if (affected) {
                                console.log('Successfully updated project table!');
                            } else {
                                console.log('std and mean could not be found!');
                            }
                            });
                    }
                    catch(err){
                        console.log("error" , err);
                    }
        })

    
        
        }
        await Judge.deleteOne({_id: judgeId._id});
        console.log(" judgedeleted")
        res.json({
            status: true,
            code: 200,
        })
    }
    else
    {
        console.log('Bad request!', req.body)
		res.json({
            status: false,
            code: 400,
        }) 

    }

})
//#####################################DELETE STUDENT ##########################################################

router.post('/deletestudent', async (req, res) => 
{
    console.log("got the body" , req.body);
    const { s_class, project_title , project_id } = req.body
    const user = await User.findOne(
        { project_id : project_id} , { _id:1,project_id:1} );
    console.log("user found", user);
    if(user)
    {
       const project = await Project.findOne(
        { project_id : project_id} ,
         { _id:1,
           project_id:1,
           judge_id_1:1,
           judge_id_2:1,
            } );
        console.log("project", project);
        if(project)
        {
            const findJudge = await Judge.find(
                { $or: [{ _id:project.judge_id_1 }, { _id:project.judge_id_2 }] },
                { _id:1,
                  j_assigned_count:1
                }
            )
            console.log("judge" , findJudge);
            if(findJudge)
            {
                    let update={};
                    async function asyncForEach(
                        array,
                        callback
                    ) {
                        for (
                            let index = 0;
                            index <
                            array.length;
                            index++
                        ) {
                            await callback(
                                array[index],
                                index,
                                array
                            );
                        }
                    }
                    await asyncForEach(
                        findJudge,
                        async arrayItem => 
                        {
                            try 
                            {
                                update.j_assigned_count = (arrayItem.j_assigned_count - 1);
                                console.log("updated list", update);
                                    await Judge.updateOne(
                                        {
                                            _id:
                                                arrayItem._id,
                                        },
                                        {
                                            $set: update,
                                        }
                                    ).then(affected => {
                                        if (affected) {
                                            console.log('Judge assigned count  has been changed!');
                                        } else {
                                            console.log('std and mean could not be found!');
                                        }
                                        });

                             }
                            catch(err)
                            {
                                console.log("error in updating judge table", err)
                            }
                        }
                    ); 
                }
            else{
                console.log("No Judges Assigned yet");
            }
            await Project.deleteOne(
                    { project_id : project_id} );
            await Project_Score.deleteOne(
                { project_id : project_id} );
        }
        else{
            console.log("No Projects found for student.")
        }
        await User.deleteOne({ _id: user._id});

        res.json({
            status: true,
            code: 200,
        })    
    }
    else{
        console.log('Bad request!', req.body)
		res.json({
            status: false,
            code: 400,
        }) 
 
    }
      
    
})  

//####################################CREATE ADMIN######################################
router.post(
	'/adminentry',
    async function(req, res, next)
     {
        if (req.body) 
        {
			console.log(req.body)
            //const {admin_email, admin_password} = req.body
            // const argon2 = require("argon2");
			// const hash = await argon2.hash(admin_password);
			// console.log("hash", hash);
            // req.body.admin_password = hash;
             const admin_array = {
                admin_email: req.body.admin_email,
                admin_password: req.body.admin_password,
                name: "Admin",
        
            };
            console.log("project created" , admin_array);
        
            Admin.create(admin_array).catch(error => {
                console.log('error in create function of project', error);
            });
            res.json({
                status: true,
                code: 200,
                message: 'Added',
            })
        }
        else{
            res.send({
				status: false,
				code: 404,
				message: 'Required Data is missing',
        })
    }
} )


//########################################ADMIN DB and LOGIN #######################################
router.post(
	'/login',
	async function(req, res, next) {
		if (req.body) {
			console.log(req.body)
    // const {admin_email, admin_password} = req.body
	await Admin.findOne(
				{ admin_email: req.body.admin_email},
				{ admin_email: 1, admin_password:1 }
			).then(async function(tdata) {
				console.log('tdata', tdata)
				console.log("admin_password", req.body.admin_password);
				//const argon2 = require('argon2');
				if (tdata!=null) {
					console.log('tdata found', tdata.admin_email);
					//const key =  await argon2.verify(tdata.admin_password,req.body.admin_password);
					//if(key)
					//{
						console.log("password is verified");
					res.json({
						status: true,
						code: 200,
						message: 'Login Done',
					})
				//}
				} else {
					console.log('invalid login')
					res.json({
						status: false,
						code: 404,
						message: 'Invalid Login Detail',
					})
				}
			})
		} else {
			res.send({
				status: false,
				code: 404,
				message: 'Required Data is missing',
			})
		}
	}
)

//############################## RANKS ##########################################################

router.get('/getranks', async (req, res) => {
	console.log("req", req.query);
	const { s_class, category } = req.query
	console.log('class nad category: ', s_class,category)
    const mockProjects = [];
    const studentList=[];
	if (s_class!=-1 && category!=-1 ) 
	{
		const data = await Project_Score.find(
			{ $and: [{ class: s_class }, { category: category }] ,},
			{
                _id: 0,
				project_id:1,
				project_title: 1,
				category: 1,
				class: 1,
				average_score: 1,
				std_deviation: 1,
                z_score: 1,
                rank: 1,
			}
        ).sort( { rank: 1 } )
        if(data)
        {
            console.log("data found", data);
            if (data && data.length > 0) 
            {
                 async function asyncForEach(
                    array,
                    callback
                ) {
                    for (
                        let index = 0;
                        index <
                        array.length;
                        index++
                    ) {
                        await callback(
                            array[index],
                            index,
                            array
                        );
                    }
                }
                await asyncForEach(
                    data,
                    async arrayItem => { 
                        //console.log("arraYiteam",arrayItem);
                        const names = await User.findOne( {project_id: arrayItem.project_id} ,
                             {s_name1: 1 , s_name2: 1 , _id:0});
                       var final = {};
                       console.log("names" , names)
                        Object.assign(final ,names._doc, arrayItem._doc);
                         studentList.push(final);
                        

                    
                    } )
                    console.log("student outside", studentList);
                res.status(200)
                res.json({ rankList: studentList })
                
            } 
            else 
            {
                res.status(200)
                res.json({ rankList: mockProjects  })

            }

        }
    }

})

module.exports = router