import { getFreeSlotsbyManagerIds, getBookedSlotsByManagerIds } from './Model';

export async function getAvailableSlots({
  salesManagerIds,
  date,
}: {
  salesManagerIds: number[];
  date: string;
}) {
  const freeSlots = await getFreeSlotsbyManagerIds({
    salesManagerIds,
    date,
  });
  const bookedSlots = await getBookedSlotsByManagerIds({
    salesManagerIds,
    date,
  });

  // Filter slots to remove overlapping ones
  const bookableSlots = freeSlots.filter((slot) => {
    return !bookedSlots.some(
      (booked) =>
        slot.sales_manager_id === booked.sales_manager_id &&
        slot.start_date < booked.end_date &&
        slot.end_date > booked.start_date,
    );
  });

  // Group by `start_date` and count records for each unique `start_date`
  const groupedSlots = bookableSlots.reduce((result, curr) => {
    const startDate = curr.start_date;
    if (!result[startDate]) {
      result[startDate] = {
        start_date: startDate,
        available_count: 1,
      };
    } else {
      result[startDate].available_count += 1;
    }
    return result;
  }, {});

  const availableSlots = Object.values(groupedSlots);
  return availableSlots;
}
