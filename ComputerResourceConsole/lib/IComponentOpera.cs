﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using ComputerResourceConsole.common;
using System.Diagnostics;

namespace ComputerResourceConsole.lib
{
    public interface IComponentOpera
    {
        string FilePath { get; set; }

        string Arguments { get; }

        int start(CommonMethod.CommonEvent exit);

        int stop();

        int bind(Process exist, CommonMethod.CommonEvent exit);
    }
}