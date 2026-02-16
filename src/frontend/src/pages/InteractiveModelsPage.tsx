import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuctionModels from '@/components/models/auctions/AuctionModels';
import MarketEntryGameModel from '@/components/models/entry/MarketEntryGameModel';
import SupplyChainBargainingModel from '@/components/models/bargaining/SupplyChainBargainingModel';

export default function InteractiveModelsPage() {
  const [activeTab, setActiveTab] = useState('auctions');

  return (
    <PageLayout
      title="Interactive Models"
      description="Explore game-theoretic models through interactive calculators. Input your parameters and see optimal strategies and equilibrium outcomes in real-time."
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2 bg-transparent">
          <TabsTrigger
            value="auctions"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Auction Models
          </TabsTrigger>
          <TabsTrigger
            value="market-entry"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Market Entry & Competition
          </TabsTrigger>
          <TabsTrigger
            value="bargaining"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Supply Chain Bargaining
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auctions" className="mt-8">
          <AuctionModels />
        </TabsContent>

        <TabsContent value="market-entry" className="mt-8">
          <MarketEntryGameModel />
        </TabsContent>

        <TabsContent value="bargaining" className="mt-8">
          <SupplyChainBargainingModel />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
