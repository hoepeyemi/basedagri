import Footer from "../components/footer"
import HomeFooter from "../components/homepage_components/HomeFooter"
import Header from "../components/navigation/Header"

const Contact = () => {
  return <div className="container mx-auto">
    <Header/>

    <div className=' mx-auto w-[30rem] border border-[#ddd] px-8 pb-12 mt-32 mb-12 flex flex-col rounded-[10px] shadow-light'>
      <h1 className="font-[800] text-[22px] text-primary40 my-8 mx-auto">Contact Us</h1>
      <label htmlFor="name" className="font-[500] text-primary40 my-4">Name</label>
      <input type="text" name="name" id="name" className="outline-none p-2 bg-[#ccc] rounded-[10px]" />
      <label htmlFor="email" className="font-[500] text-primary40 my-4">Email</label>
      <input type="Email" name="email" id="email" className="outline-none p-2 bg-[#ccc] rounded-[10px]" />
      <label htmlFor="reason" className="font-[500] text-primary40 my-4">Your Reason</label>
      <textarea name="reason" id="reason" cols="30" rows="10" className="outline-none p-2 bg-[#ccc] rounded-[10px]"></textarea>
      <button className="bg-primary40 px-8 py-4 rounded-[10px] text-white mx-auto mt-8">Submit</button>
    </div>
    <HomeFooter/>
    <Footer/>
    </div>
}

export default Contact