# NodeJs
This repository contains a collection of Node.js projects and practice exercises. Each project is designed to cover different aspects of Node.js, ranging from basic concepts to advanced features, helping developers strengthen their backend development skills.


<!-- aggreagations -->
suppose we have a married and unmarried people how to know which is married of not we use match aggreagtion 
and we count how many peoples are married or not 

<!-- [
{
  $match: {
    ismarried:true
  }
},
  {
    $count: 'Marriedpeople'
  }
] -->

in these code we know how we can count how much people were married on current time

<! -->
get the name of top five favrfruites

<!-- [
  {
    $group: {
      _id: null,
      avgAge:{
        $avg:"$age"
      }
      
    }
  }
] this code is for how to find average age of the people or an employee -->


[
  {
    $group: {
      _id: "$role",
      roleCount:{
        $sum: 1
      }
    }
  },
  {
    $sort: {
      roleCount: -1
    }
  },{
    $limit: 5
  }
  
] In these code we are going to find top five roles in our json data

get he top 2 countries which has most users

<!-- [
  {
    $lookup: {
      from:"profiles",
      localField: "orderId",
      foreignField: "_id",
      as: "orderDetails"
    }
  },
  {
    $addFields: {
      orderDetails: {
        $first :"$orderDetails"
      }
    }
  }
] --> this the code of the lookup and easy undertable code