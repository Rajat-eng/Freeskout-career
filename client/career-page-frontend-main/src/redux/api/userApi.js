
import { emptySplitApi } from ".";
import { authenticate,unAuthenticate, userSlice } from "../reducers/user";

export const userSliceApi=emptySplitApi.injectEndpoints({
  reducerPath:'userAuth',
  tagTypes:["User"],
  endpoints:(build)=>({
    loadUser:build.query({
      query:()=>({url:'/getme',credentials:'include',headers:{
        "Content-type":"application/json"
      },}),
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
          const data=await queryFulfilled;
          dispatch(authenticate(data));   
        } catch (error) {
          dispatch(unAuthenticate())
          console.log(error)
        }
      } 
    }),

    loginApplicant:build.mutation({
      query:(body)=>(
      {
        url:'/applicant/login',
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        credentials:"include",
        body
      }),
      transformResponse:(response,meta,arg)=>{
        return response
      },
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
          const data=await queryFulfilled;
          //console.log(data)
          dispatch(authenticate(data))
        } catch (error) {
          //console.log(error)
        }
      }
    }),

    loginRecruiter:build.mutation({
      query:(body)=>({url:'/recruiter/login',method:'POST',headers:{
        "Content-type":"application/json"
      },
      credentials:"include",
      body}),
      transformResponse:(response,meta,arg)=>{
        return response
      },
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
          const data=await queryFulfilled;
          dispatch(authenticate(data))
        } catch (error) {
          //console.log(error)
        }
      }
    }),

    registerApplicant:build.mutation({
      query:(signUpData,email,otp)=>({url:'/applicant/register',method:'POST',body:JSON.stringify({...signUpData,email,otp})}),
      transformResponse:(response,meta,arg)=>response,
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
          const data=await queryFulfilled;
          console.log(data)
          dispatch(authenticate(data))
        } catch (error) {
          console.log(error)
        }
      }
    }),

    logoutUser:build.mutation({
      query:()=>({url:'/logout',method:'POST',credentials:'include'}),
      async onQueryStarted(args,{dispatch,queryFulfilled}){
        try {
          const data=await queryFulfilled;
          console.log(data)
          dispatch(unAuthenticate())
        } catch (error) {
          console.log(error)
        }
      }
    })
  })
})

export const selectUser=userSliceApi.endpoints.loadUser.select()

export const {useLoadUserQuery,useLoginApplicantMutation,useLoginRecruiterMutation,useRegisterApplicantMutation,useLogoutUserMutation}=userSliceApi



