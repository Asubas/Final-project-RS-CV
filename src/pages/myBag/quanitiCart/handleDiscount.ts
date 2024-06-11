import { toast } from 'react-toastify';
import { projectKey } from '../../../lib/exports/exportsContants';
import { checkUser } from '../../../lib/flow/anonymFlow';
import { getCart } from '../../../lib/flow/getCart';
import { promoRef } from '../myBag';
import { successPromo, unSuccessPromo } from '../../../components/toastyOption/toastyOptions';

const handleDiscount = () => {
  return getCart().then((res) => {
    if (res.statusCode === 200) {
      return checkUser()
        .withProjectKey({ projectKey })
        .carts()
        .withId({ ID: res.body.id })
        .post({
          body: {
            version: res.body.version,
            actions: [
              {
                action: 'addDiscountCode',
                code: promoRef.current?.value as string,
                // code: 'HappyStudent',
              },
            ],
          },
        })
        .execute()
        .then((resPromo) => {
          if (resPromo.statusCode === 200) {
            toast.success(
              '💥💥💥 You have successfully applied the promo code! Congratulations on completing the course!!!✨💫🔥🧙🧙🧙',
              successPromo,
            );
          }
        })
        .catch(() => {
          toast.error(
            '🎈🤷‍♂️ Friend, it looks like you made a mistake and entered the wrong promo code! Try again!!🚨🚨🚨',
            unSuccessPromo,
          );
        });
    }
  });
};

export { handleDiscount };
