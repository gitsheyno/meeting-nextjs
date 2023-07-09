import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
const NewMeetUpPage = () => {
  const router = useRouter();
  const addMeetUp = async (obj) => {
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    router.push("/");
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>Add Meetups</title>
        <meta name="description" content="Add your own meetups" />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUp} />
    </>
  );
};

export default NewMeetUpPage;
