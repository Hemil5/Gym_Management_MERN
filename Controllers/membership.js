import {modalMembership as Membership} from '../Modals/membership.js'


export const addMembership = async (req, res) => {
    try {
        const { months, price } = req.body;
        const memberShip = await Membership.findOne({ gym: req.gym._id, months });
        if (memberShip) {
            memberShip.price = price;
            await memberShip.save();
            res.status(200).json({
                message: "Updated Successfully"
            })
        } else {
            const nuwMembership = new Membership({ price, months, gym: req.gym._id });
            await nuwMembership.save()
            res.status(200).json({
                newMembership : nuwMembership,
                message: "Added Successfully"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "All fields are required"
        })
    }
}


export const getmembership = async (req, res) => {
    try {
        const loggedInId = req.gym._id;
        const memberShip = await Membership.find({gym:loggedInId})
        res.status(200).json({
            message : "Membership fetched Successfully",
            memberShip
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Server Error"
        })
    }
}