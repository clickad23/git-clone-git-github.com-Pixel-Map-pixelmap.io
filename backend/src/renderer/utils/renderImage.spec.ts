import { decompressTileCode } from './decompressTileCode';
import { renderImage } from './renderImage';

it('successfully renders a PNG image from a compressed image string', async () => {
  const compressedImage =
    // eslint-disable-next-line max-len
    'b#I@Y8KucA>C=C$amO}}.yB"wn7S4JMIgmxvTR#6?fMx89"gv=Ng~)}w.FaSy63j:PAgZ@8klfYnduUCA4jNfEe#:d~OC(~3NJ}r8.$_>rsm*vE}W0z7i~b~UV&6IsQ&@3r2.|8gWFd=vky~Y.|ookg=<hy4>*c?k[j.4{j)D|Txq?Hkb9?cYSf';
  await renderImage(decompressTileCode(compressedImage), 'cache/test.png');
  expect(decompressTileCode(compressedImage)).toBe(
    // eslint-disable-next-line max-len
    'd84000000d84940000000000355355355355355134134355d84d84d849400001741742b5000355355134134355355355d84d84d849400001741742b50003553551341343553553559400000000001741741740006300000003553553553551340001741742b51740000006306300000001341341341341342b52b52b52b5174000000000c730000001341341341341342b52b52b52b5174000000000c730000001341341341341342b5174174174174000000c73c73000000466466466466466db1000000db1db1174174000c73000000466134134134355db1db1db1174174000000000000134134466355355355134db1db1db1174174000000000000134134466355355355134174174174000000900900000355134134466355355355355000000000900d50000000000134134134466355355355134000000000000000000000355355134134466134134134355000000000000000000000355355134134466134134134355000000000000134134134134134134134134134134134134',
  );
});

it('successfully renders a PNG image from tile #793', async () => {
  const compressedImage =
    // eslint-disable-next-line max-len
    'b#I@O::YABaLvWDv5urAW,2Org@WKr7D^h,KI(QJ($W")*=P1Zq]10^qzVBjX0xVY:ER1:m2;XMAqiz_pC';
  await renderImage(decompressTileCode(compressedImage), 'cache/test-793.png');
  expect(decompressTileCode(compressedImage)).toBe(
    // eslint-disable-next-line max-len
    'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000fff000fff000fffffffff000fff000000000000ffffffffffff000fff000fffffffff000fff000ffffff000ffffffffffffffffff000fffffffff000fff000ffffff000ffffffffffffffffff000fffffffff000fff000ffffff000ffffffffffffffffff000fffffffff000fff000ffffff000ffffffffffff000fff000000fff000000fff000ffffff000fff000000fff000ffffff000fff000ffffff000000000000fff000000fff000ffffff000fff000ffffff000ffffff000ffffff000fff000ffffff000fff000ffffff000ffffff000ffffff000fff000ffffff000fff000ffffff000ffffff000ffffff000fff000ffffff000000000ffffff000ffffff000ffffff000fff000ffffff000000000ffffff000ffffff000000000000fff000fffffffff000fffffffff000000000ffffffffffffffffffffffffffffffffffffffffffffffff',
  );
});

it('successfully renders a PNG image from tile #293', async () => {
  const compressedImage =
    // eslint-disable-next-line max-len
    'b#I@HPAAe+xWe';
  await renderImage(decompressTileCode(compressedImage), 'cache/test-293.png');
  expect(decompressTileCode(compressedImage)).toBe(
    // eslint-disable-next-line max-len
    'x',
  );
});
