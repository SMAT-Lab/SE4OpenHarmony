#!/bin/sh
#
# Copyright (C) 2023 Huawei Device Co., Ltd.
#
# This software is distributed under a license. The full license
# agreement can be found in the file LICENSE in this distribution.
# This software may not be copied, modified, sold or distributed
# other than expressed in the named license agreement.
#
# This software is distributed without any warranty.
#

cp ./0001-.patch ../socket.io-client-cpp/
cd ../socket.io-client-cpp/
patch -p1 < 0001-.patch
rm -rf 0001-.patch