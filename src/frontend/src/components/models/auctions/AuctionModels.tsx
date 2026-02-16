import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FirstPriceAuctionCalculator from './FirstPriceAuctionCalculator';
import SecondPriceAuctionCalculator from './SecondPriceAuctionCalculator';
import SealedBidAuctionCalculator from './SealedBidAuctionCalculator';

export default function AuctionModels() {
  const [selectedModel, setSelectedModel] = useState<string>('first-price');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auction Strategy Calculator</CardTitle>
          <CardDescription>
            Select an auction format to analyze optimal bidding strategies and expected outcomes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Auction Format</label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first-price">First-Price Sealed-Bid Auction</SelectItem>
                <SelectItem value="second-price">Second-Price Sealed-Bid Auction (Vickrey)</SelectItem>
                <SelectItem value="sealed-bid">General Sealed-Bid Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedModel === 'first-price' && <FirstPriceAuctionCalculator />}
          {selectedModel === 'second-price' && <SecondPriceAuctionCalculator />}
          {selectedModel === 'sealed-bid' && <SealedBidAuctionCalculator />}
        </CardContent>
      </Card>
    </div>
  );
}
