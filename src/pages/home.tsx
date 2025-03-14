import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RocketIcon, LayoutGridIcon, NetworkIcon, SettingsIcon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { enumPages } from "@/share/enum.pages";

export default function Home() {

  const {setTabActive}= useAppContext();

  const handleClick = () => {

    setTabActive(enumPages.DEFINENETWORK)
  }
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Master VLSM Subnetting</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn how to efficiently divide your network into subnets using Variable Length Subnet Masking (VLSM).
        </p>
        <Button size="lg" className="gap-2" onClick={handleClick}>
          <RocketIcon className="h-5 w-5" />
          Get Started
        </Button>
      </section>

      {/* Explanation Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">What is VLSM Subnetting?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Efficient IP Allocation</h3>
            <p className="text-muted-foreground">
              VLSM allows you to allocate IP addresses more efficiently by using subnet masks of different lengths for different subnets.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Optimized Network Design</h3>
            <p className="text-muted-foreground">
              With VLSM, you can design networks that minimize IP address waste and adapt to varying subnet size requirements.
            </p>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Why Use VLSM?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 text-center">
            <LayoutGridIcon className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Flexibility</h3>
            <p className="text-muted-foreground">
              Create subnets of varying sizes to fit your network needs.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <NetworkIcon className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
            <p className="text-muted-foreground">
              Reduce IP address waste and optimize resource usage.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <SettingsIcon className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Scalability</h3>
            <p className="text-muted-foreground">
              Easily expand your network without redesigning the entire IP scheme.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <RocketIcon className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Performance</h3>
            <p className="text-muted-foreground">
              Improve network performance by reducing broadcast domains.
            </p>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Try our VLSM Subnetting Calculator and optimize your network today.
        </p>
        <Button size="lg" className="gap-2" onClick={handleClick}>
          <RocketIcon className="h-5 w-5" />
          Start Calculating
        </Button>
      </section>
    </div>
  );
}