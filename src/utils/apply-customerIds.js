export function cutomerIds(customers) {
  return customers?.length > 0 && customers?.map((customer) => customer.id);
}