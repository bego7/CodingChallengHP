exports.inviteUser = (req, res)=>{
    let invitationBody = req.body;
    // checks that a shopId param is sent
    if(!req.params){
        return res.send("NO PARAMS PASSED")
    }
    
    if(!req.params.shopId){
        return res.send("No shopId was passed")
    }
    
    if(req.params.artist === ""){
        return res.send("shopId is empty")
    } 
    // shopId value exists
    else{
        let shopId = req.params.shopId;
        const authUrl = "https://url.to.auth.system.com/invitation";
    
        superagent
        .post(authUrl)
        .send(invitationBody)
        .end((err, invitationResponse) =>{
            if (invitationResponse.status === 201) {

                const query = {
                    authId: invitationResponse.body.authId
                };
                const update = {
                    authId: invitationResponse.body.authId,
                    email: invitationBody.email
                };
            User.findOneAndUpdate(query,update,
            {
                upsert: true,
                new: true
            }, (err, createdUser)=>{
                Shop.findById(shopId).exec((err, shop)=> {
                if (err || !shop) {
                    return res.status(500).send(err || { message: 'No shop found' });
                }
                else if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
                    shop.invitations.push(invitationResponse.body.invitationId);
                }
                else if (shop.users.indexOf(createdUser._id) === -1) {
                    shop.users.push(createdUser);
                }
                shop.save();
                });
            });
            } 
            else if (invitationResponse.status === 200) {
            res.status(400).json({
                error: true,
                message: 'User already invited to this shop'
            });
            return;
            }
            res.json(invitationResponse);
        });
        }
    
   };