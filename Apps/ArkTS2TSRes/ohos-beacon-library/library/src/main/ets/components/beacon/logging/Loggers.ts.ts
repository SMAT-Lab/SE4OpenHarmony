/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Logger from './Logger';
import EmptyLogger from './EmptyLogger';
import VerboseHarmonyLogger from './VerboseOpenHarmonyLogger';
import InfoHarmonyLogger from './InfoOpenHarmonyLogger';
import WarningHarmonyLogger from './WarningOpenHarmonyLogger';
/**
 * Static factory methods for getting different {@link org.altbeacon.beacon.logging.Logger}
 * implementations.
 */
class Loggers {
    /** Empty Logger Singleton. */
    private static readonly EMPTY_LOGGER: Logger = new EmptyLogger();
    /** Debug Logger Singleton. */
    private static readonly VERBOSE_HARMONY_LOGGER: Logger = new VerboseHarmonyLogger();
    /** Info Logger Singleton. */
    private static readonly INFO_HARMONY_LOGGER: Logger = new InfoHarmonyLogger();
    /** Warning Logger Singleton. */
    private static readonly WARNING_HARMONY_LOGGER: Logger = new WarningHarmonyLogger();
    /**
         * @return Get a logger that does nothing.
         */
    public static empty(): Logger {
        return Loggers.EMPTY_LOGGER;
    }
    /**
         * @return Get a logger that logs all messages to default logs.
         */
    public static verboseLogger(): Logger {
        return Loggers.VERBOSE_HARMONY_LOGGER;
    }
    /**
         * @return Get a logger that logs messages of info and greater.
         */
    public static infoLogger(): Logger {
        return Loggers.INFO_HARMONY_LOGGER;
    }
    /**
         * @return Get a logger that logs messages of warning and greater.
         */
    public static warningLogger(): Logger {
        return Loggers.WARNING_HARMONY_LOGGER;
    }
    private Loggers() {
        // No instances
    }
}
export default Loggers;
