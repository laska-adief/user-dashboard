import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserDetail } from "@/types/user";
import { BriefcaseBusiness, Globe, Mail, MapPin, Phone } from "lucide-react";

const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const dataUser: UserDetail = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: { lat: "-37.3159", lng: "81.1496" },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    posts: [
      {
        userId: 1,
        id: 1,
        title: "Exploring the Kulas Light",
        body: "The architecture in Gwenborough is truly unique...",
      },
      {
        userId: 1,
        id: 2,
        title: "Neural-net deep dive",
        body: "Harnessing real-time markets requires a specific stack...",
      },
    ],
    todos: [
      {
        userId: 1,
        id: 1,
        title: "Complete client-server setup",
        completed: true,
      },
      {
        userId: 1,
        id: 2,
        title: "Refactor neural-net logic",
        completed: false,
      },
    ],
  };

  console.log("id user : ", id);

  return (
    <>
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
    </>
  );
};

export default UserDetailsPage;
