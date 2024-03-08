import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(async(username='SnehashisDasgupta') => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${username}`);
      const { repos, userProfile } = await res.json();
      
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
      setUserProfile(userProfile);
      setRepos(repos);

      console.log(userProfile);
      console.log(repos);

      return {userProfile, repos};

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, repos } = await getUserProfileAndRepos(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
    setSortType('recent');
  };

  const onSort = (sortType) => {
    if (sortType === "recent"){
      // descending order of date {recent repo first}
      repos.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)); 
    } else if (sortType === "stars"){
      // descending order of stars in repo {most star repo at top}
      repos.sort((a,b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks"){
      // descending order of count of forks {most forks repo at top}
      repos.sort((a,b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  }

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />

      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}

      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {!loading && <Repos repos={repos} />}

        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage;
