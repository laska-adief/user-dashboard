import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ArrowLeft, BriefcaseBusiness, Eye, Globe, Mail, MapPin, Newspaper, Phone, SquareCheckBig } from "lucide-react";
import PostCard from "./components/PostCard";
import AllPostsCard from "./components/AllPostsCard";
import TodosCard from "./components/TodosCard";
import { getUserDetail } from "@/action/getUserDetail";
import { Post } from "@/types/post";
import BackButton from "@/components/ui/back-button";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  const dataUser = await getUserDetail(id);

  return {
    title: `${dataUser.name} (@${dataUser.username})`,
    description: `View profile details for ${dataUser.name} from ${dataUser.company.name}. Contact via ${dataUser.email}.`,
  };
}

const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const dataUser = await getUserDetail(id);

  return (
    <>
      <BackButton backText='Back to Users' />
      <div className="flex flex-col md:flex-row items-center gap-8 p-4">
        <Avatar className="w-48 h-48">
          <AvatarImage src="" alt={dataUser.name} />
          <AvatarFallback className="text-7xl">
            {dataUser.name.at(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-4 md:gap-2 text-center md:text-left">
          <div className="text-sm text-slate-500">@{dataUser.username}</div>
          <div className="text-4xl md:text-7xl font-bold">{dataUser.name}</div>
          <div className="flex flex-col md:flex-row items-center gap-6 text-slate-600">
            <div className="flex gap-2">
              <Mail />
              <span>{dataUser.email}</span>
            </div>
            <div className="flex gap-2">
              <Phone />
              <span>{dataUser.phone}</span>
            </div>
            <div className="flex gap-2">
              <Globe />
              <span>{dataUser.website}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="flex gap-2">
              <MapPin className="text-blue-400 h-6 w-6" />
              <div className="text-xl font-semibold">Address</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">street / suite</div>
              <div className="text-lg">
                {dataUser.address.street}, {dataUser.address.suite}
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <div className="text-slate-500 uppercase">city</div>
                <div className="text-lg">{dataUser.address.city}</div>
              </div>
              <div>
                <div className="text-slate-500 uppercase">zipcode</div>
                <div className="text-lg">{dataUser.address.zipcode}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              <BriefcaseBusiness className="text-blue-400 h-6 w-6" />
              <div className="text-xl font-semibold">Company</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">name</div>
              <div className="text-lg">{dataUser.company.name}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">tagline</div>
              <div className="text-lg">{dataUser.company.catchPhrase}</div>
            </div>
            <div>
              <div className="text-slate-500 uppercase">services</div>
              <div className="text-lg">{dataUser.company.bs}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* POSTS */}
      <div className="p-4">
        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="text-blue-400 h-6 w-6" />
                <h3 className="text-lg font-semibold">POSTS</h3>
              </div>

              {
                dataUser.posts.length > 2 && (
                  <AllPostsCard posts={dataUser.posts} />
                )
              }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataUser.posts.slice(0, 2).map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TODOS */}
      <div className="p-4">
        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SquareCheckBig className="text-blue-400 h-6 w-6" />
                <h3 className="text-lg font-semibold">TODOS</h3>
              </div>

            </div>
            <TodosCard todos={dataUser.todos} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserDetailsPage;
