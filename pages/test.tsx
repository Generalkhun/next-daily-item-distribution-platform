import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import { VillagerHomeData } from '../type'
/**
 * Dynamic imports
 */
const MapWithHomeLocations = dynamic(() => import("../components/MainContent/MapWithHomeLocations"), {
  // loading: () => "Loading...",
  ssr: false
});

const Home: NextPage = () => {
  return (
    <>
      <p>hi</p>
      <MapWithHomeLocations
        setDrawerOpen={undefined} mapCenterLocation={[13.761721721881523, 100.64443277825553]} villagerHomeListData={[]} onClickVillager={function (villager: VillagerHomeData, isFromClickLocation: boolean): void {
          throw new Error('Function not implemented.')
        }} setMap={undefined} isShowOnlyWaitingVillager={false} />
    </>
  )
}

export default Home
