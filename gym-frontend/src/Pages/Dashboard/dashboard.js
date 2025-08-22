import React, { useState, useEffect, useRef } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const ref = useRef();

  const handleOnClickMenu = (value)=>{
    sessionStorage.setItem('func',value);
  }

  return (
    <div className='w-3/4 text-black p-5 relative'>
      <div className='w-full bg-slate-900 text-white rounded-lg flex  p-3 justify-between items-center'>
      </div>

      <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]'> 

        {/* this is the card block */}
        <Link to={'/member'} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
          
          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
            <PeopleAltIcon sx={{ color: 'green', fontSize: '50px' }} />
            <p className='text-xl my-3 font-semibold font-mono'>Joined Members</p>
          </div>
        </Link>
         
        
        {/* this is the card block */}
        <Link to={'/specific/monthly'} onClick={()=>handleOnClickMenu("monthlyJoined")} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-gradient-to-r from-emerald-500 via-line-400 to-pink-500'></div>

          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <SignalCellularAltIcon sx={{ color: "purple", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-mono'>Monthly Joined</p>
          </div>
        </Link>

        {/* this is the card block */}
        {/* LINK Work is REMAINING */}
        <Link to={'/specific/expire-with-in-3-days'} onClick={()=>handleOnClickMenu("threeDayExpire")} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-gradient-to-r from-blue-400 to-blue-600'></div>
          
          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
            <AccessAlarmIcon sx={{ color: 'red', fontSize: '50px' }} />
            <p className='text-xl my-3 font-semibold font-mono'>Expiring Within 3 Days</p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link to={'/specific/expire-with-in-4-7-days'} onClick={()=>handleOnClickMenu("fourToSevenDaysExpire")} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-gradient-to-r from-blue-400 to-blue-600'></div>

          <div className='py-3.5 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <AccessAlarmIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-mono'>Expiring Within 4-7 Days</p>
          </div>
        </Link>

        {/* this is the card block */}
        <Link to={'/specific/expired'} onClick={()=>handleOnClickMenu("expired")} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-gradient-to-r from-blue-500 to-red-500'></div>

          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white '>
            <ErrorIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className='text-xl my-3 font-semibold font-mono'>Expired</p>
          </div> 
        </Link>

        {/* this is the card block */}
        {/* LINK Work is REMAINING */}
        <Link to={'/specific/inactive-members'} onClick={()=>handleOnClickMenu("inActiveMembers")} className='w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
          <div className='h-3 rounded-t-lg bg-gradient-to-r from-orange-400 to-pink-500'></div>
          
          <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
            <ReportIcon sx={{ color: 'brown', fontSize: '50px' }} />
            <p className='text-xl my-3 font-semibold font-mono'>InActive Members</p>
          </div> 
        </Link>

      </div>


    </div>
  )
}

export default Dashboard